require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const ALCHEMY_API_KEY_MAINNET_URL = `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY_MAINNET_URL}`;

/** @type import('hardhat/config').HardhatUserConfig */

const DEFAULT_COMPILER_SETTINGS = {
  version: "0.7.6",
  settings: {
    evmVersion: "istanbul",
    optimizer: {
      enabled: true,
      runs: 1_000_000,
    },
    metadata: {
      bytecodeHash: "none",
    },
  },
};

module.exports = {
  // solidity: "0.7.6",
  solidity: {
    compilers: [DEFAULT_COMPILER_SETTINGS],
  },
  networks: {
    hardhat: {
      forking: {
        url: ALCHEMY_API_KEY_MAINNET_URL,
      },
    },
  },
  mocha: {
    timeout: 100000000,
  },
};
