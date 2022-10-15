const { expect } = require("chai");
const { ethers } = require("hardhat");

const DAI = "0x6b175474e89094c44da98b954eedeac495271d0f";
const USDC = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48";

const DAI_WHALE = "0x336c82e4f54e1a6a3adb1fb115c9a6ef3a2b2b11";
const USDC_WHALE = "0x236F233dBf78341d25fB0F1bD14cb2bA4b8a777c";

describe("LiquidityExamples", function () {
  let liquidityExamples;
  let accounts;
  let dai;
  let usdc;

  before(async () => {
    accounts = await ethers.getSigners(1);

    const LiquidityExamples = await ethers.getContractFactory(
      "LiquidityExamples"
    );

    liquidityExamples = await LiquidityExamples.deploy();
    await liquidityExamples.deployed();

    dai = await ethers.getContractAt("IERC20", DAI);
    usdc = await ethers.getContractAt("IERC20", USDC);

    await network.provider.request({
      method: "hardhat_impersonateAccount",
      params: [DAI_WHALE],
    });

    await network.provider.request({
      method: "hardhat_impersonateAccount",
      params: [USDC_WHALE],
    });

    const daiWhale = await ethers.getSigner(DAI_WHALE);
    const usdcWhale = await ethers.getSigner(USDC_WHALE);

    const daiAmount = 100n * 10n ** 18n;
    const usdcAmount = 100n * 10n ** 6n;

    expect(await dai.balanceOf(daiWhale.address)).to.gte(daiAmount);
    expect(await usdc.balanceOf(usdcWhale.address)).to.gte(usdcAmount);

    await dai.connect(daiWhale).transfer(accounts[0].address, daiAmount);
    await usdc.connect(usdcWhale).transfer(accounts[0].address, usdcAmount);
  });

  it("mintNewPosition", async () => {
    const daiAmount = 100n * 10n ** 18n;
    const usdcAmount = 100n * 10n ** 6n;

    await dai
      .connect(accounts[0])
      .transfer(liquidityExamples.address, daiAmount);
    await usdc
      .connect(accounts[0])
      .transfer(liquidityExamples.address, usdcAmount);

    await liquidityExamples.mintNewPosition();

    console.log(
      "DAI balance after add liquidity",
      await dai.balanceOf(accounts[0].address)
    );

    console.log(
      "USDC balance after add liquidity",
      await usdc.balanceOf(accounts[0].address)
    );
  });
});
