// SPDX-License-Identifier: MIT
pragma solidity ^0.7.3;

import "./UpfireToken.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract UpfireSwap is Ownable {
    uint256 private rate;
    IERC20 private UFR;
    UpfireToken private UPR;

    event SwapRate(uint256 amount);
    event Swap(address account, uint256 input, uint256 output);

    constructor(IERC20 _UFR, UpfireToken _UPR) public {
        UFR = _UFR;
        UPR = _UPR;
        rate = 1;
    }

    function getSwapRate() public view returns (uint256) {
        return rate;
    }

    function setSwapRate(uint256 newRate) public onlyOwner {
        require(newRate > 0, 'SwapRate must more than 0');
        rate = newRate;
        emit SwapRate(newRate);
    }

    function swap(uint256 amount) public {
        require(UFR.transferFrom(msg.sender, address(this), amount) == true, "Transfer error");
        uint256 outputAmount = amount * rate;
        UPR.mint(msg.sender, outputAmount);
        emit Swap(msg.sender, amount, outputAmount);
    }

    function withdrawUFR(address receiver, uint256 amount) public onlyOwner {
        require(UFR.transfer(receiver, amount) == true, "Withdraw error");
    }
}