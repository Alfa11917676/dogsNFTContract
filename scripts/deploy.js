// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  [owner,anotherOwner,arnab]= await ethers.getSigners();
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
  await dogsContract.setFreeSaleStatus(true);
  console.log("reached");
  await dogsContract.connect(owner).freeSaleBuy();
  try {
    await dogsContract.connect(owner).freeSaleBuy();
  } catch(e) {
    console.log("Error from owner because of "+e)
  }


  await dogsContract.connect(anotherOwner).freeSaleBuy();
  console.log(await dogsContract.balanceOf(owner.address));
  console.log(await dogsContract.balanceOf(arnab.address));
  console.log(await dogsContract.balanceOf(anotherOwner.address));
  // console.log(dogsContract.address);
  // console.log (arnab.address);
  // console.log (owner.address);
  // console.log (anotherOwner.address);

  console.log(await dogsContract.ownerAddress());
  await  dogsContract.connect(owner).changeOwnerAddress (anotherOwner.address);
  await dogsContract.connect(owner).transferOwnership (anotherOwner.address);
  console.log(await dogsContract.ownerAddress());
  // await dogsContract.transferOwnership(owner.address);
  // await dogsContract.changeOwnerAddress (owner.address);
  // console.log(await dogsContract.ownerAddress());
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
