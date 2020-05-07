pragma solidity 0.6.7;

interface ICryptoETF {
    function purchase(uint256 _amount, uint256 _deadline) external returns(bool success);

    function sell(uint256 _amount, uint256 _deadline) external returns(uint256 amount);

    function rebalance(address[] calldata _tokens, uint256[] _ratio) external returns(bool success);

    function expectedCETF(uint256 _baseAmount) external view returns(uint256 cETF);

    function tokens() external view returns(address[] token);

    function ratio(address _token) external view returns(uint256 amount);
}
