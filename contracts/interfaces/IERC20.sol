pragma solidity 0.6.7;

interface IERC20 {
    function transfer(address to, uint256 amount) external returns(bool success);
    function transferFrom(address owner, address to, uint256 amount) external returns(bool success);
    function balanceOf(address owner) external view returns(uint256 balance);
}
