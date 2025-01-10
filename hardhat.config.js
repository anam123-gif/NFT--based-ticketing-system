/** @type import('hardhat/config').HardhatUserConfig */
require("@nomicfoundation/hardhat-ignition");

module.exports = {
  ignition: {
    modules: ["./ignition/modules/NFTTicketingModule.ts"],
  },
  solidity: {
    version: "0.8.28",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  paths: {
    artifacts: "./artifacts",
    sources: "./contracts",
    tests: "./test",
  },
  networks: {
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/InR6QE9UbummkQ-DWwlFKJNp3A9DtfGW",
      accounts: [
        "a3dcfaf57beedfbacdc6b4262ff9c552c043f9ab0194cc89975ee3f303c549d7",
      ],
      chainId: 11155111,
    },
    // localhost: {
    //   url: "http://localhost:8545",
    // },
  },
  defaultNetwork: "sepolia",
};