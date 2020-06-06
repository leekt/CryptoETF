pragma solidity 0.6.8;

interface ICryptoETF {
    event Purchase(address customer, uint256 usdc, uint256 cetf);
    event Sell(address customer, uint256 usdc, uint256 cetf);

    function purchase(uint256 _amount, uint256 _deadline) external returns(uint256 amount);

    function sell(uint256 _amount, uint256 _deadline) external returns(uint256 amount);

    function rebalance(uint256[] calldata _ratio) external returns(bool success);

    function expectedCETF(uint256 _baseAmount) external view returns(uint256 cETF);

    function base() external view returns(address baseToken);

    function tokens() external view returns(address[] memory token);

    function ratio(address _token) external view returns(uint256 amount);
}
