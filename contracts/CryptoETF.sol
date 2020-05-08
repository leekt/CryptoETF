pragma solidity 0.6.7;

import "./interfaces/ICryptoETF.sol";

contract CryptoETF is ICryptoETF {
    IERC20 internal _baseToken;

    IUniswapV2Router internal _router;

    address[] internal _assets;
    mapping(address => uint256) internal _ratio;
    uint256 internal _slippage;

    function puchase(uint256 _amount, uint256 _deadline) external override returns(uint256 amount){
        _baseToken.transferFrom(msg.sender, address(this), _amount);
        amount = _expectedCETF(_amount);
        for(uint256 i = 0; i < _assets.length ; i++) {
            uint256 baseIn = _getBaseToAsset(i, _amount);
            // TODO change expected token output
            // DO NOT use uniswap as price table
            uint256 assetOut = _router.getAmountsOut(_getTokenRatio, [address(_baseToken), _assets[i]]);
            _router.swapExactTokenToTokens(baseIn, assetOut, [address(_baseToken), _assets[i]], msg.sender, _deadline);
        }

        _mint(msg.sender, amount);
        emit Purchase(msg.sender, _amount, amount);
    }

    function expectedCETF(uint256 _baseAmount) external view returns(uint256 cETF) {
        cETF = _expectedCETF(_baseAmount);
    }

    function sell(uint256 _amount, uint256 _deadline) external returns(uint256 amount) {
        uint256 assetValue = _getValueAsBase();
        for(uint256 i = 0; i < _assets.length; i++){
            amount = amount.add(_sell(i, assetValue, _amount, _deadline));
        }
    }

    function _sell(uint256 _assetIndex, uint256 _totalValue, uint256 _sellAmount, uint256 _deadline) external returns(uint256 amount) {
        uint256 tokenIn = IERC20(_assets[_assetIndex]).balanceOf(address(this)).mul(_sellAmount).div(_totalValue);
        // TODO change expected token output
        // DO NOT use uniswap as price table
        uint256 tokenOut = _router.getAmountsOut(tokenIn, [_assets[_assetIndex], address(_baseToken)]);
        uint256[] temp = _router.swapExactTokenToTokens(tokenIn, tokenOut, [_assets[_assetIndex], address(_baseToken)], msg.sender, _deadline)[0];
        amount = temp[0];
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
            uint256 baseOut = _router.getAmountsOut(assetBalance, [_assets[i], address(_baseToken)]);
            value = value.add(baseOut);
        }
    }

    function _expectedCETF(uint256 _baseAmount) internal view returns(uint256 cETF) {
        cETF = _totalSupply.mul(_baseAmount).div(_getValueAsBase());
    }
}
