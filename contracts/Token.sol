// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;

contract Token {
  string public name = "The Awesome Token";
  string public symbol = "AWE";
  uint256 public totalSupply = 100000000000;
  uint256 public decimals = 6;

  mapping(address => uint256) public balanceOf;
  
  constructor() public {
    balanceOf[msg.sender] = totalSupply;
  }
}
