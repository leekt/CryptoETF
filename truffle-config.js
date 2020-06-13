const HDWalletProvider = require('truffle-privatekey-provider');
const KlaytnWalletProvider = require("truffle-hdwallet-provider-klaytn");
const mnemonic = 'hello hello';
const privateKey = '';
const infuraKey = '';
module.exports = {
  plugins: ['solidity-coverage'],
  networks: {
    mainnet: {
      provider: function() {
        return new HDWalletProvider(privateKey, `https://tn.henesis.io/ethereum/mainnet?clientId=a481485a958f1b82ac310ec4eea27943`);
      },
      port: 8545,
      skipDryRun: true,
      network_id: 1,
      gasPrice: 30000000000
    },
    ropsten: {
      provider: function() {
        return new HDWalletProvider(privateKey, `https://tn.henesis.io/ethereum/ropsten?clientId=a481485a958f1b82ac310ec4eea27943`);
      },
      port: 8545,
      network_id: '3',
      skipDryRun: true,
      gasPrice: 40000000000
    },
    rinkeby: {
      provider: function() {
        return new HDWalletProvider(mnemonic, `https://rinkeby.infura.io/v3/${infuraKey}`);
      },
      port: 8545,
      network_id: '4',
      skipDryRun: true,
    },
    development: {
      host: 'localhost',
      port: 8545,
      network_id: '*',
    },
    coverage: {
      host: 'localhost',
      network_id: '*',
      port: 8555,
      gas: 0xfffffffffff,
      gasPrice: 0x01,
    },
    klaytn_testnet: {
      provider: () => new KlaytnWalletProvider(privateKey, "https://api.baobab.klaytn.net:8651"),
        network_id: '1001', //Klaytn baobab testnet's network id
        gas: '8500000',
        gasPrice: null
    },
    klaytn_mainnet: {
      provider: () => new KlaytnWalletProvider(privateKey, "https://api.cypress.klaytn.net:8651"),
        network_id: '8217', //Klaytn mainnet's network id
        gas: '8500000',
        gasPrice: null
    },
  },

  compilers: {
    solc: {
      version: '0.6.10',
      settings: {
        optimizer: {
          enabled: true,
          runs: 200,
        },
        evmVersion: '', //basically verstion defult, petersburg, istanbul use petersburg for klaytn
      },
    },
  },
};
