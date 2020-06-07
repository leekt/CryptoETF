pragma solidity 0.6.8;

contract SimpleETF {

    //MODIFIED "CryptoETF/contracts/interfaces/ICryptoETF.sol"
    
    event Purchase(address indexed customer, uint256 usdc, uint256 indexed cetf);
    //input(usdc) for DATA output & address for TOPICS
    
    event Sell(address indexed customer, uint256 indexed usdc, uint256 cetf);
    //input(cetf) for DATA output & address for TOPICS

    //MODIFIED "CryptoETF/contracts/CryptoETF.sol"
    
    function purchase(uint256 _amount, uint256 _deadline) external returns(uint256 amount){
    //FROM uscd (=_amount) TO cetf (=amount)
        amount = _amount;
        emit Purchase(msg.sender, _amount, amount);
    }

    function sell(uint256 _amount, uint256 _deadline) external returns(uint256 amount) {
    //FROM cetf (=_amount) TO usdc (=amount)
        amount = _amount+1;
        emit Sell(msg.sender, amount, _amount);
    }
}
