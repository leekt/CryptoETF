const ETF = artifacts.require('CryptoETF');
const BN = web3.utils.BN;
module.exports = async function(deployer) {
  //use wrapped eth as base for ropsten network
  await deployer.deploy(ETF,"0xc778417e063141139fce010982780140aa0cd5ab","0xf164fC0Ec4E93095b804a4795bBe1e041497b92a",["0xad6d458402f60fd3bd25163575031acdce07538d"],
                        [new BN('100000000000000000000')], 0);
};

