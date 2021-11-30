// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  [owner,anotherOwner]= await ethers.getSigners();
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const GetDogsContract = await hre.ethers.getContractFactory("TESTDOGS");
  const dogsContract = await GetDogsContract.deploy();
  var _values = 5;
  await dogsContract.setFreeMintLimitToAddress([owner.address,anotherOwner.address],[_values,_values]);
  await dogsContract.toggleFreeSaleStatus(true);
  console.log("reached");
  await dogsContract.connect(owner).freeSaleBuy();
  console.log(await dogsContract.freeSalePurchaseCount(owner.address));
  console.log(dogsContract.address);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
