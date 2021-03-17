/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require("@nomiclabs/hardhat-ethers");
require('hardhat-contract-sizer');
require('@nomiclabs/hardhat-etherscan');
require('./tasks/deployUpfireToken');
require('./tasks/deployUpfireSwap');
require('dotenv').config();

const config = {
  contractSizer: {
    alphaSort: true,
    runOnCompile: true,
    disambiguatePaths: false,
  },
  solidity: "0.7.3",
  networks: {
    hardhat: {
      throwOnTransactionFailures: true,
      throwOnCallFailures: true,
      allowUnlimitedContractSize: true,
      blockGasLimit: 0x1fffffffffffff,
    },
  }
};

if (process.env.RPC_URL && process.env.PRIVATE_KEY) {
  config.networks.mainnet = {
    accounts: [`0x${process.env.PRIVATE_KEY}`],
    url: `https://mainnet.infura.io/v3/${process.env.RPC_URL}`,
  };
}

if (process.env.ETHERSCAN_API_KEY) {
  config.etherscan = {
    apiKey: process.env.ETHERSCAN_API_KEY,
  };
}

module.exports = config;
