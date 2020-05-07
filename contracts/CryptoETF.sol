pragma solidity 0.6.7;

import "./interfaces/ICryptoETF.sol";

contract CryptoETF is ICryptoETF {
    IERC20 internal _baseToken;

    IUniswapV2Router internal _router;

    address[] internal _assets;
    mapping(address => uint256) internal _ratio;

    function puchase(uint256 _amount, uint256 _deadline) external override returns(bool success){
        _baseToken.transferFrom(msg.sender, address(this), _amount);
        for(uint256 i = 0; i < _assets.length ; i++) {
            uint256 baseIn = _getBaseRatio(_amount, i);
            //TODO change expected token output
            uint256 assetOut = _router.getAmountsOut(_getTokenRatio, [address(_baseToken), _assets[i]]);
            _router.swapExactTokenToTokens(baseIn, assetOut, [address(_baseToken), _assets[i]], msg.sender, _deadline);
        }

        _mint(msg.sender, _expectedCETF(_amount));
        emit Purchase(msg.sender, _amount);
        return true;
    }

    function _getValueAsBase() internal view returns(uint256 value) {
        for(uint256 i = 0; i < _assets.length; i++) {
            uint256 assetBalance = IERC20(_assets[i]).balanceOf(address(this));
            uint256 baseOut = _router.getAmountsOut(asseBalance, [_assets[i], address(_baseToken)]);
            value = value.add(baseOut);
        }
    }

    function _expectedCETF(uint256 _baseAmount) internal view returns(uint256 cETF) {
        cETF = _totalSupply.mul(_baseAmount).div(_getValueAsBase().add(_baseAmount));
    }

    function expectedCETF(uint256 _baseAmount) external view returns(uint256 cETF) {
        cETF = _expectedCETF(_baseAmount);
    }

    function
}
