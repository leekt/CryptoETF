pragma solidity 0.6.6;

interface IETF {
    function purchase(uint256 amount) external returns(bool);

    function sell(uint256 amount) external returns(bool);

    function rebalance(address[] memory token, uint256[] ratio) external returns(bool);

    function ratio(address token) external view returns(uint256 ratio);

    function tokens() external view returns(address[] token);
}
