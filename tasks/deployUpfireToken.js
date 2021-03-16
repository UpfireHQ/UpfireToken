require("@nomiclabs/hardhat-web3");

task('deployUpfireToken', 'Deploys the UPF token')
  .setAction(async () => {
    const Token = await hre.ethers.getContractFactory('UpfireToken');
    const token = await Token.deploy();
    await token.deployed();
    console.log(`Deployed at: ${token.address}`);

    const cap = await token.cap();
    console.log(`Cap is: ${cap.toString()}`);
  });