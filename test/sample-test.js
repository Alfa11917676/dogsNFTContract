const { expect } = require("chai");
const { ethers } = require("hardhat");
const hre = require("hardhat");
const {save} = require("solidity-coverage/plugins/resources/plugin.utils");

describe("Dogs contract", function () {
  it("Deploying the contract on localhost", async function () {
    [owner,anotherOwner,arnab]= await ethers.getSigners();
    const GetDogsContract = await hre.ethers.getContractFactory("TESTDOGS");
    const dogsContract = await GetDogsContract.deploy();
    await dogsContract.deployed();

    //expect(await greeter.greet()).to.equal("Hello, world!");

    await dogsContract.setFreeSaleStatus(true);
    var _values = 5;
    await dogsContract.setFreeMintLimitToAddress([owner.address,anotherOwner.address],[_values,_values]);
    await dogsContract.connect(owner).freeSaleBuy();
    await dogsContract.connect(anotherOwner).freeSaleBuy();

    expect(await dogsContract.balanceOf(owner.address)).to.equal("0x05");
    expect(await dogsContract.balanceOf(anotherOwner.address)).to.equal("0x05");
    expect(await dogsContract.balanceOf(arnab.address)).to.equal("0x00");
    expect(await dogsContract.balanceOf(arnab.address)).to.equal("0x00");
  });
});
