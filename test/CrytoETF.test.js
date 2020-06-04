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

const CryptoETF = artifacts.require('CryptoETF');

const TOTALSUPPLY = new web3.utils.BN('1000000000000000000000000');

contract('CryptoETF', function(account) {
  const [deployer , ...others] = account;
  beforeEach(async function(){
    Erc20.setProvider(web3.currentProvider);
    this.tokenA = await Erc20.new(TOTALSUPPLY, {from:deployer});
    this.tokenB = await Erc20.new(TOTALSUPPLY, {from:deployer});
    Weth.setProvider(web3.currentProvider);
    this.weth = await Weth.new({from:deployer});
    UniswapV2Factory.setProvider(web3.currentProvider);
    this.factory = await UniswapV2Factory.new(deployer, {from:deployer});
    UniswapV2Router01.setProvider(web3.currentProvider);
    this.router = await UniswapV2Router01.new(this.factory.address,this.weth.address, {from:deployer});
  });

  it('test', async function(){
    await this.factory.createPair(this.tokenA.address, this.tokenB.address, {from:deployer});
    await this.tokenA.approve(this.router.address, -1, {from:deployer});
    await this.tokenB.approve(this.router.address, -1, {from:deployer});
    await this.router.addLiquidity(this.tokenA.address, this.tokenB.address,10000,40000,0,0,deployer,-1,{from:deployer});
    this.etf = await CryptoETF.new(this.tokenA.address, this.router.address, [this.tokenB.address], [new web3.utils.BN('100000000000000000000')], 0, {from:deployer});

    await this.tokenA.approve(this.etf.address, -1, {from:deployer});
    await this.etf.purchase(100, -1, {from:deployer});
  });
});

