//SPDX-License-Identifier: MIT
pragma solidity ^0.7.3;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract TestToken is ERC20 {
    constructor (string memory name, string memory symbol, uint256 supply) ERC20(name, symbol) public {
        _mint(msg.sender, supply);
    }
}
