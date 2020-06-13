const ETF = artifacts.require('CryptoETF');
const Contract = require('@truffle/contract');
const erc20 = require('@uniswap/v2-periphery/build/ERC20.json');
const Erc20 = Contract(erc20);
const weth = require('@uniswap/v2-periphery/build/WETH9.json');
const Weth = Contract(weth);
const uniswapV2Pair = require('@uniswap/v2-core/build/UniswapV2Pair.json');
const UniswapV2Pair = Contract(uniswapV2Pair);
const uniswapV2Factory = require('@uniswap/v2-core/build/UniswapV2Factory.json');
const UniswapV2Factory = Contract(uniswapV2Factory);
const uniswapV2Router01 = require('@uniswap/v2-periphery/build/UniswapV2Router01.json');
const UniswapV2Router01 = Contract(uniswapV2Router01);

const BN = web3.utils.BN;
const TOTALSUPPLY = new web3.utils.BN('1000000000000000000000000');
module.exports = async function(deployer, network, accounts) {
//    Erc20.setProvider(web3.currentProvider);
//    this.tokenA = await Erc20.new(TOTALSUPPLY, {from:accounts[0]});
//    this.tokenB = await Erc20.new(TOTALSUPPLY, {from:accounts[0]});
//    this.tokenC = await Erc20.new(TOTALSUPPLY, {from:accounts[0]});
//    Weth.setProvider(web3.currentProvider);
//    this.weth = await Weth.new({from:accounts[0]});
//    UniswapV2Factory.setProvider(web3.currentProvider);
//    this.factory = await UniswapV2Factory.new(accounts[0], {from:accounts[0]});
//    UniswapV2Router01.setProvider(web3.currentProvider);
//    this.router = await UniswapV2Router01.new(this.factory.address,this.weth.address, {from:accounts[0]});
//
//    await this.factory.createPair(this.tokenA.address, this.tokenB.address, {from:accounts[0]});
//    await this.factory.createPair(this.tokenA.address, this.tokenC.address, {from:accounts[0]});
//    await this.tokenA.approve(this.router.address, -1, {from:accounts[0]});
//    await this.tokenB.approve(this.router.address, -1, {from:accounts[0]});
//    await this.tokenC.approve(this.router.address, -1, {from:accounts[0]});
    Erc20.setProvider(web3.currentProvider);
    this.tokenA = await Erc20.at("0x8b65afda82c3ad82c356f75754217578c80bba1b");
    this.tokenB = await Erc20.at("0xe4cec046a6d60f94b94c09a1d7891fe675d2196d");
    this.tokenC = await Erc20.at("0x7ec060933ee549112465d669e4ee239ae4927051");
    UniswapV2Router01.setProvider(web3.currentProvider);
    this.router = await UniswapV2Router01.at("0xd71918576670b59ff51b979ba464b3e48ef82bb5");
//    this.etf = await ETF.at("0xeb604b7c4523082b759111a99987064c90cabcbb");
//    await this.router.addLiquidity(this.tokenA.address, this.tokenB.address,new BN('100000000000000000000000'),new BN('100000000000000000000000'),0,0,accounts[0],-1,{from:accounts[0]});
//    await this.router.addLiquidity(this.tokenA.address, this.tokenC.address,new BN('100000000000000000000000'),new BN('100000000000000000000000'),0,0,accounts[0],-1,{from:accounts[0]});
    this.etf = await ETF.new(this.tokenA.address, this.router.address, [this.tokenC.address, this.tokenB.address],
                                   [
                                     new web3.utils.BN('50000000000000000000'),
                                     new web3.utils.BN('50000000000000000000'),
                                   ],
                                   {from:accounts[0]});
    await this.tokenA.approve(this.etf.address, -1, {from:accounts[0]});
    const receipt = await this.etf.purchase(100, -1, {from:accounts[0]});
    console.log(this.etf.address);
 // await this.etf.sell(100, -1, {from:accounts[0]});

};

