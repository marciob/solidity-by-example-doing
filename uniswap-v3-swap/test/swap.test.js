const { expect } = require("chai");
const { ethers } = require("hardhat");

const DAI = "0x6b175474e89094c44da98b954eedeac495271d0f";
const WETH9 = "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2";
const USDC = "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48";

describe("SwapExamples", function () {
  let swapExamples;
  let accounts;
  let weth;
  let dai;

  before(async () => {
    accounts = await ethers.getSigners();

    weth = await ethers.getContractAt("IWETH", WETH9);
    dai = await ethers.getContractAt("IERC20", DAI);

    const SwapExamples = await ethers.getContractFactory("SwapExamples");
    swapExamples = await SwapExamples.deploy();
    await swapExamples.deployed();
  });

  //   it("swapExactInputSingle", async function () {
  //     // const accounts = await ethers.getSigners();

  //     // const weth = await ethers.getContractAt("IWETH", WETH9);
  //     // const dai = await ethers.getContractAt("IERC20", DAI);

  //     // const SwapExamples = await ethers.getContractFactory("SwapExamples");
  //     // const swapExamples = await SwapExamples.deploy();
  //     // await swapExamples.deployed();

  //     const amountIn = 10n ** 18n; // 1 ETH

  //     await weth.connect(accounts[0]).deposit({ value: amountIn });
  //     await weth.connect(accounts[0]).approve(swapExamples.address, amountIn);

  //     await swapExamples.swapExactInputSingle(amountIn);
  //     //tests if DAI was deposited after a swap
  //     console.log("DAI balance", await dai.balanceOf(accounts[0].address));
  //   });

  it("swapExactOutputSingle", async function () {
    // const accounts = await ethers.getSigners();

    // const weth = await ethers.getContractAt("IWETH", WETH9);
    // const dai = await ethers.getContractAt("IERC20", DAI);

    // const SwapExamples = await ethers.getContractFactory("SwapExamples");
    // const swapExamples = await SwapExamples.deploy();
    // await swapExamples.deployed();

    const wethAmountInMax = 10n ** 18n; // 1 ETH

    const daiAmountOut = 100n * 10n ** 18n;

    await weth.connect(accounts[0]).deposit({ value: wethAmountInMax });
    await weth
      .connect(accounts[0])
      .approve(swapExamples.address, wethAmountInMax);

    await swapExamples.swapExactOutputSingle(daiAmountOut, wethAmountInMax);
    //tests if DAI was deposited after a swap
    console.log("DAI balance", await dai.balanceOf(accounts[0].address));
  });
});
