/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require("@nomiclabs/hardhat-ethers");
require('hardhat-contract-sizer');
require('@nomiclabs/hardhat-etherscan');
require('./tasks/deployUpfireToken');
require('./tasks/deployUpfireSwap');
require('dotenv').config();

const ethers = require('ethers');

const config = {
  contractSizer: {
    alphaSort: true,
    runOnCompile: true,
    disambiguatePaths: false,
  },
  solidity: {
    version: "0.7.3",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000
      }
    }
  },
  networks: {
    hardhat: {
      throwOnTransactionFailures: true,
      throwOnCallFailures: true,
      allowUnlimitedContractSize: true,
      blockGasLimit: 0x1fffffffffffff,
      gasPrice: parseInt(ethers.utils.parseUnits('271', 'gwei')),
    },
  }
};

if (process.env.RPC_URL && process.env.PRIVATE_KEY) {
  config.networks.mainnet = {
    accounts: [`0x${process.env.PRIVATE_KEY}`],
    url: process.env.RPC_URL,
  };
}

if (process.env.ETHERSCAN_API_KEY) {
  config.etherscan = {
    apiKey: process.env.ETHERSCAN_API_KEY,
  };
}

module.exports = config;
