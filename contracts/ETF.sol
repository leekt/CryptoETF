pragma solidity 0.6.6;

import IETF from "./interfaces/IETF.sol";

contract ETF is IETF {
    IERC20 USDC;
    constructor() public {
    }

    function purchase(uint256 amount) external override returns(bool success) {
        USDC.transferFrom(msg.sender, address(this), amount);
        _mint(msg.sender, amount);
        _purchase(uint256 amount);
        emit Purchased
    }

    function sell(uint256 amount) external override returns(bool success) {
        _burn(msg.sender, amount);
        USDC.transfer(msg.sender, usdc);
    }
}
