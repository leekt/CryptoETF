
const CryptoETFABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_base",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_uniswapRouter",
        "type": "address"
      },
      {
        "internalType": "address[]",
        "name": "_tokens",
        "type": "address[]"
      },
      {
        "internalType": "uint256[]",
        "name": "_percentage",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "currentOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "customer",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "usdc",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "cetf",
        "type": "uint256"
      }
    ],
    "name": "Purchase",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address[]",
        "name": "tokens",
        "type": "address[]"
      },
      {
        "indexed": false,
        "internalType": "uint256[]",
        "name": "ratio",
        "type": "uint256[]"
      }
    ],
    "name": "Rebalance",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "customer",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "usdc",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "cetf",
        "type": "uint256"
      }
    ],
    "name": "Sell",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      }
    ],
    "name": "allowance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "remaining",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "balance",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "ownerAddress",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "renounceOwnership",
    "outputs": [
      {
        "internalType": "bool",
        "name": "success",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "total",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [
      {
        "internalType": "bool",
        "name": "success",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "internalType": "string",
        "name": "tokenName",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "internalType": "string",
        "name": "tokenSymbol",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "decimals",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "tokenDecimals",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "base",
    "outputs": [
      {
        "internalType": "address",
        "name": "token",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [],
    "name": "tokens",
    "outputs": [
      {
        "internalType": "address[]",
        "name": "token",
        "type": "address[]"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_token",
        "type": "address"
      }
    ],
    "name": "ratio",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "percentage",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "internalType": "bool",
        "name": "success",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [
      {
        "internalType": "bool",
        "name": "success",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [
      {
        "internalType": "bool",
        "name": "success",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_deadline",
        "type": "uint256"
      }
    ],
    "name": "purchase",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_baseAmount",
        "type": "uint256"
      }
    ],
    "name": "expectedCETF",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "cETF",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function",
    "constant": true
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_deadline",
        "type": "uint256"
      }
    ],
    "name": "sell",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256[]",
        "name": "_percentage",
        "type": "uint256[]"
      }
    ],
    "name": "rebalance",
    "outputs": [
      {
        "internalType": "bool",
        "name": "success",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

function setContract(){
  window.etf = new window.web3.eth.Contract(CryptoETFABI, "0xC843270e6a2A88A9b7f1377a222515da9C06Cc3C");
  window.tokenA = new window.web3.eth.Contract(CryptoETFABI, "0x8b65afda82c3ad82c356f75754217578c80bba1b");
  window.tokenB = new window.web3.eth.Contract(CryptoETFABI, "0x7ec060933ee549112465d669e4ee239ae4927051");
  window.tokenC = new window.web3.eth.Contract(CryptoETFABI, "0xe4cec046a6d60f94b94c09a1d7891fe675d2196d");
}

function trimAddress(address){
  console.log(address);
  return address.substring(0,10) + "..." + address.substring(34);
}

function appendToPurchaseTable(x) {
  if(window.purchaseStamp < x.blockNumber*10000 + x.logIndex){
    // Insert a row in the table at the last row
    const newRow   = window.tablePurchase.insertRow();

    // Insert a cell in the row at index 0
    const addressCell  = newRow.insertCell(0);

    // Append a text node to the cell
    const address  = document.createElement('a');
    address.href = "https://ropsten.etherscan.io/address/" + x.returnValues.customer;
    address.innerText = trimAddress(x.returnValues.customer);
    addressCell.appendChild(address);

    // Insert a cell in the row at index 0
    const cetfCell  = newRow.insertCell(1);

    // Append a text node to the cell
    const cetf  = document.createTextNode(x.returnValues.cetf);
    cetfCell.appendChild(cetf);

    // Insert a cell in the row at index 0
    const baseCell  = newRow.insertCell(2);

    // Append a text node to the cell
    const baseAmount  = document.createTextNode(x.returnValues.usdc);
    baseCell.appendChild(baseAmount);
    window.purchaseStamp = x.blockNumber*10000 + x.logIndex;
    console.log("PURCHASE : " + window.purchaseStamp);
  }
}

function appendToSellTable(x) {
  if(window.sellStamp < x.blockNumber*10000 + x.logIndex){
    // Insert a row in the table at the last row
    const newRow   = window.tableSell.insertRow();

    // Insert a cell in the row at index 0
    const addressCell  = newRow.insertCell(0);

    // Append a text node to the cell
    const address  = document.createElement('a');
    address.href = "https://ropsten.etherscan.io/address/" + x.returnValues.customer;
    address.innerText = trimAddress(x.returnValues.customer);
    addressCell.appendChild(address);

    // Insert a cell in the row at index 0
    const cetfCell  = newRow.insertCell(1);

    // Append a text node to the cell
    const cetf  = document.createTextNode(x.returnValues.cetf);
    cetfCell.appendChild(cetf);

    // Insert a cell in the row at index 0
    const baseCell  = newRow.insertCell(2);

    // Append a text node to the cell
    const baseAmount  = document.createTextNode(x.returnValues.usdc);
    baseCell.appendChild(baseAmount);
    window.sellStamp = x.blockNumber*10000 + x.logIndex;
    console.log("SELL : " + window.sellStamp);
  }
}

function setTableData(){
  window.tablePurchase = document.getElementById('purchaselogs').getElementsByTagName('tbody')[0];
  window.tableSell = document.getElementById('selllogs').getElementsByTagName('tbody')[0];

  window.purchaseStamp=0;
  window.sellStamp=0;

  window.etf.events.Purchase()
  .on('data', function(event) {
    appendToPurchaseTable(event);
  });
  window.etf.events.Sell()
  .on('data', function(event) {
    appendToSellTable(event);
  });
  window.etf.getPastEvents("Purchase", {
    fromBlock:8083779
  },function(error, event){
    event.forEach(x=> {
      appendToPurchaseTable(x);
    });
  });
  window.etf.getPastEvents("Sell", {
    fromBlock:8083779
  },function(error, event){
    event.forEach(x=> {
      appendToSellTable(x);
    });
  });
}


function rebalance() {
  const BN = window.web3.utils.BN;
  const aRatio = (new BN(document.getElementById("bRatio").value).mul(new BN(10).pow(new BN(18)))).toString(10);
  const bRatio = (new BN(document.getElementById("cRatio").value).mul(new BN(10).pow(new BN(18)))).toString(10);
  const data = window.etf.methods.rebalance([aRatio,bRatio]).encodeABI();
  const transaction = {
    nonce: '0x00', // ignored by MetaMask
    gasPrice: '0x4A817C800', // customizable by user during MetaMask confirmation.
    gas: '0xF4240', // customizable by user during MetaMask confirmation.
    to: window.etf.options.address, // Required except during contract publications.
    from: ethereum.selectedAddress, // must match user's active address.
    value: '0x00', // Only required to send ether to the recipient from the initiating external account.
    data: data,
    chainId: 3, // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
  };

  window.ethereum.sendAsync(
    {
      method: 'eth_sendTransaction',
      params: [transaction],
      from: ethereum.selectedAddress,
    });
}

function approveAll() {
  const data = window.tokenA.methods.approve(window.etf.options.address, -1).encodeABI();
  const transaction = {
    nonce: '0x00', // ignored by MetaMask
    gasPrice: '0x4A817C800', // customizable by user during MetaMask confirmation.
    gas: '0xF4240', // customizable by user during MetaMask confirmation.
    to: window.tokenA.options.address, // Required except during contract publications.
    from: ethereum.selectedAddress, // must match user's active address.
    value: '0x00', // Only required to send ether to the recipient from the initiating external account.
    data: data,
    chainId: 3, // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
  };

  window.ethereum.sendAsync(
    {
      method: 'eth_sendTransaction',
      params: [transaction],
      from: ethereum.selectedAddress,
    });
}


function purchase() {
  const aAmount = document.getElementById("tokenAmount").value;
  const data = window.etf.methods.purchase(aAmount, -1).encodeABI();
  const transaction = {
    nonce: '0x00', // ignored by MetaMask
    gasPrice: '0x4A817C800', // customizable by user during MetaMask confirmation.
    gas: '0xF4240', // customizable by user during MetaMask confirmation.
    to: window.etf.options.address, // Required except during contract publications.
    from: ethereum.selectedAddress, // must match user's active address.
    value: '0x00', // Only required to send ether to the recipient from the initiating external account.
    data: data,
    chainId: 3, // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
  };

  window.ethereum.sendAsync(
    {
      method: 'eth_sendTransaction',
      params: [transaction],
      from: ethereum.selectedAddress,
    });
}

function sell() {
  const aAmount = document.getElementById("cETFAmount").value;
  const data = window.etf.methods.sell(aAmount, -1).encodeABI();
  const transaction = {
    nonce: '0x00', // ignored by MetaMask
    gasPrice: '0x4A817C800', // customizable by user during MetaMask confirmation.
    gas: '0xF4240', // customizable by user during MetaMask confirmation.
    to: window.etf.options.address, // Required except during contract publications.
    from: ethereum.selectedAddress, // must match user's active address.
    value: '0x00', // Only required to send ether to the recipient from the initiating external account.
    data: data,
    chainId: 3, // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
  };

  window.ethereum.sendAsync(
    {
      method: 'eth_sendTransaction',
      params: [transaction],
      from: ethereum.selectedAddress,
    });
}
function getBalance(address, balanceType) {
  if(balanceType=="acc"){
    window.etf.methods.balanceOf(address).call().then(
      (result) =>{
        document.getElementById(balanceType + "-etfBalance").value = result;
      }
    );
  }else{
    window.etf.methods.totalSupply().call().then(
      (result) =>{
        document.getElementById(balanceType + "-etfBalance").value = result;
      }
    );
  }
  window.tokenA.methods.balanceOf(address).call().then(
    (result) =>{
      document.getElementById(balanceType + "-aBalance").value = result;
    }
  );
  window.tokenB.methods.balanceOf(address).call().then(
    (result) =>{
      document.getElementById(balanceType + "-bBalance").value = result;
    }
  );
  window.tokenC.methods.balanceOf(address).call().then(
    (result) =>{
      document.getElementById(balanceType + "-cBalance").value = result;
    }
  );
}


function ethEnabled(callback) {
  ethereum.sendAsync({
    method: 'eth_requestAccounts',
  }, (error, response)=>{
    if(error) {
      alert("web3 not connected! check metamask");
    }
    console.log(response);
    const accounts = response.result
    console.log(accounts);
    // You now have an array of accounts!
    // Currently only ever one, e.g.:
    // ['0xFDEa65C8e26263F6d9A1B5de9555D2931A33b825']
    window.web3 = new Web3(window.ethereum);
    callback();
  });
}
