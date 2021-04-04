require("@nomiclabs/hardhat-web3");

task('deployUpfireSwap', 'Deploys the UPF token')
  .addParam('oldTokenAddress', 'Address of the old Upfiring token')
  .addParam('newTokenAddress', 'Address of the new Upfire token')
  .setAction(async ({ oldTokenAddress, newTokenAddress }) => {
    const UpfireSwap = await hre.ethers.getContractFactory('UpfireSwap');
    const upfireSwap = await UpfireSwap.deploy(oldTokenAddress, newTokenAddress);
    await upfireSwap.deployed();
    console.log(`Deployed at: ${upfireSwap.address}`);
  });