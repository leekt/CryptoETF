pragma solidity 0.6.8;

import "./interfaces/ICryptoETF.sol";
import "./interfaces/IUniswapV2Router01.sol";
import "./interfaces/IERC20.sol";

import "./library/SafeMath.sol";
import "./erc20/ERC20.sol";

contract CryptoETF is ICryptoETF, ERC20 {

    using SafeMath for uint256;

    IERC20 internal _baseToken;

    IUniswapV2Router01 internal _router;

    address[] internal _assets;
    mapping(address => uint256) internal _ratio;
    uint256 internal _slippage;

    constructor(address _base, address _uniswapRouter, address[] memory _tokens, uint256[] memory _percentage, uint256 _approvableSlippage) public {
        _baseToken = IERC20(_base);
        _router = IUniswapV2Router01(_uniswapRouter);
        _assets = _tokens;
        _setRatio(_percentage);
        _slippage = _approvableSlippage;
    }

    function name() external view override returns(string memory tokenName) {
        tokenName = "CryptoETF";
    }

    function symbol() external view override returns(string memory tokenSymbol) {
        tokenSymbol = "cETF";
    }

    function decimals() external view override returns(uint8 tokenDecimals) {
        tokenDecimals = 18;
    }

    function base() external view override returns(address token) {
        token = address(_baseToken);
    }

    function tokens() external view override returns(address[] memory token) {
        token = _assets;
    }

    function ratio(address _token) external view override returns(uint256 percentage) {
        percentage = _ratio[_token];
    }


    function transfer(address _to, uint256 _amount) external override returns(bool success) {
        success =  _transfer(msg.sender, _to, _amount);
    }

    function transferFrom(address _from, address _to, uint256 _amount) external override returns(bool success) {
        _transfer(_from, _to, _amount);
        _approve(_from, msg.sender, _allowances[_from][msg.sender].sub(_amount));
        success = true;
    }

    function approve(address _spender, uint256 _amount) external override returns(bool success) {
        success = _approve(msg.sender, _spender, _amount);
    }

    function purchase(uint256 _amount, uint256 _deadline) external override returns(uint256 amount){
        _baseToken.transferFrom(msg.sender, address(this), _amount);
        _baseToken.approve(address(_router), _amount);
        amount = _expectedCETF(_amount);
        for(uint256 i = 0; i < _assets.length ; i++) {
            uint256 baseIn = _getAssetExchangeInput(i, _amount);
            // TODO change expected token output
            // DO NOT use uniswap as price table
            address[] memory path = _toDynamicArray([address(_baseToken), _assets[i]]);
            _router.swapExactTokensForTokens(baseIn, 1, path, address(this), _deadline)[0];
        }

        _mint(msg.sender, amount);
        emit Purchase(msg.sender, _amount, amount);
    }

    function expectedCETF(uint256 _baseAmount) external view override returns(uint256 cETF) {
        cETF = _expectedCETF(_baseAmount);
    }

    function sell(uint256 _amount, uint256 _deadline) external override returns(uint256 amount) {
        uint256 assetValue = _getValueAsBase();
        for(uint256 i = 0; i < _assets.length; i++){
            uint256 received = _sell(i, assetValue, _amount, _deadline);
            amount = amount.add(received);
        }
        _burn(msg.sender, _amount);
        emit Sell(msg.sender, amount, _amount);
    }

    function rebalance(uint256[] calldata _percentage) external override returns(bool success) {
        _sellAll();
        _setRatio(_percentage);
        _buyAll();
        success = true;
    }

    function _toDynamicArray(address[2] memory array) internal pure returns(address[] memory dynamic) {
        dynamic = new address[](2);
        dynamic[0] = array[0];
        dynamic[1] = array[1];
    }

    function _sellAll() internal returns(bool success) {
        for(uint256 i = 0; i < _assets.length; i++){
            address[] memory path = _toDynamicArray([_assets[i], address(_baseToken)]);
            _router.swapExactTokensForTokens(IERC20(_assets[i]).balanceOf(address(this)), 1, path, address(this), now);
        }
        return true;
    }

    function _buyAll() internal returns(bool success) {
        for(uint256 i = 0; i < _assets.length; i++) {
            address[] memory path = _toDynamicArray([address(_baseToken), _assets[i]]);
            _router.swapExactTokensForTokens(_getAssetExchangeInput(i,_baseToken.balanceOf(address(this))), 1, path, address(this), now)[0];
        }
    }

    function _setRatio(uint256[] memory _percentage) internal returns(bool success) {
        require(_percentage.length == _assets.length, "SetRatio : Input lenght is different to asset length");
        uint256 sum;
        for(uint256 i = 0; i < _percentage.length; i++) {
            sum = sum.add(_percentage[i]);
            _ratio[_assets[i]] = _percentage[i];
            IERC20(_assets[i]).approve(address(_router), IERC20(_assets[i]).totalSupply());
        }
        require(sum == _hundred(), "SetRatio : Input does not sum to hundred");
        return true;
    }

    function _getAssetExchangeInput(uint256 _assetIndex, uint256 _amount) internal view returns(uint256 amount){
        return _amount.mul(_ratio[_assets[_assetIndex]]).div(_hundred());
    }

    function _sell(uint256 _assetIndex, uint256 _totalValue, uint256 _sellAmount, uint256 _deadline) internal returns(uint256 amount) {
        uint256 tokenIn = IERC20(_assets[_assetIndex]).balanceOf(address(this)).mul(_sellAmount).div(_totalValue);
        // TODO change expected token output
        // DO NOT use uniswap as price table
        address[] memory path = _toDynamicArray([_assets[_assetIndex], address(_baseToken)]);
        amount = _router.swapExactTokensForTokens(tokenIn, 1, path, msg.sender, _deadline)[0];
    }

    function _getBaseToAsset(uint256 _assetIndex, uint256 _amount) internal view returns(uint256 amount) {
        return _amount.mul(_ratio[_assets[_assetIndex]]).div(_hundred());
    }

    function _hundred() internal pure returns(uint256 amount) {
        return 100*(10**18);
    }

    function _getValueAsBase() internal view returns(uint256 value) {
        // TODO change to use Chain link as price table
        for(uint256 i = 0; i < _assets.length; i++) {
            uint256 assetBalance = IERC20(_assets[i]).balanceOf(address(this));
            if(assetBalance == 0 ){
                continue;
            }else{
                address[] memory path = _toDynamicArray([_assets[i], address(_baseToken)]);
                uint256 baseOut = _router.getAmountsOut(assetBalance, path)[0];
                value = value.add(baseOut);
            }
        }
    }

    function _expectedCETF(uint256 _baseAmount) internal view returns(uint256 cETF) {
        if(_getValueAsBase() == 0) {
            cETF = _baseAmount;
        } else {
            cETF = _totalSupply.mul(_baseAmount).div(_getValueAsBase());
        }
    }
}
