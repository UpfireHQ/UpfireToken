const keccak256 = require('keccak256');
const { expect } = require('chai');

describe('Swap', () => {
  it('should do the swap', async () => {
    const accounts = await ethers.getSigners();

    const OldUpfiringToken = await hre.ethers.getContractFactory('TestToken');
    const oldUpfiringToken = await OldUpfiringToken.deploy('Upfiring Old', 'UFR', '21000000000000000000000000'); // 21m UFR
    await oldUpfiringToken.deployed();

    const UpfireToken = await hre.ethers.getContractFactory('UpfireToken');
    const upfireToken = await UpfireToken.deploy();
    await upfireToken.deployed();

    const UpfireSwap = await hre.ethers.getContractFactory('UpfireSwap');
    const upfireSwap = await UpfireSwap.deploy(oldUpfiringToken.address, upfireToken.address);
    await upfireSwap.deployed();

    const MINTER_ROLE = `0x${keccak256('MINTER_ROLE').toString('hex')}`;
    const grantRole = await upfireToken.grantRole(MINTER_ROLE, upfireSwap.address);
    await grantRole.wait();

    const swapAmount = '1000000000000000000'; // 1 UFR
    const approve = await oldUpfiringToken.approve(upfireSwap.address, swapAmount)
    await approve.wait();

    const swap = await upfireSwap.swap(swapAmount);
    await swap.wait();

    expect((await oldUpfiringToken.balanceOf(accounts[0].address)).toString()).to.equal('20999999000000000000000000'); // -1 UFR
    expect((await upfireToken.balanceOf(accounts[0].address)).toString()).to.equal('1000000000000000000'); // +1 UFR

    const withdraw = await upfireSwap.withdrawUFR(accounts[1].address, '1000000000000000000');
    await withdraw.wait();

    expect((await oldUpfiringToken.balanceOf(accounts[1].address)).toString()).to.equal('1000000000000000000'); // 1 UFR
    expect((await oldUpfiringToken.balanceOf(upfireSwap.address)).toString()).to.equal('0');
  });
});