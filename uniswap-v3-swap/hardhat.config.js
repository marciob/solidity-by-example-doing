require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const ALCHEMY_API_KEY_MAINNET_URL = `https://eth-mainnet.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY_MAINNET_URL}`;

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.7.6",
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
