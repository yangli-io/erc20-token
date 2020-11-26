// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;

contract Token {
  string public name = "The Awesome Token";
  string public symbol = "AWE";
  uint256 public totalSupply = 100000000000;
  uint256 public decimals = 6;

  mapping(address => uint256) public balanceOf;
  mapping(address => mapping(address => uint256)) public allowance;
  
  constructor() public {
    balanceOf[msg.sender] = totalSupply;
  }

  function transfer(address _to, uint256 _value) public returns (bool success) {
    require(balanceOf[msg.sender] >= _value, "INSUFFICIENT_BALANCE");

    balanceOf[msg.sender] -= _value;
    balanceOf[_to] += _value;

    return true;
  }

  function approve(address _to, uint256 _value) public returns (bool success) {
    allowance[msg.sender][_to] = _value;

    return true;
  }

  function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
    require(balanceOf[_from] >= _value, "INSUFFICIENT_BALANCE");
    require(allowance[_from][msg.sender] >= _value, "INSUFFICIENT_ALLOWANCE");

    balanceOf[_from] -= _value;
    balanceOf[_to] += _value;

    allowance[_from][msg.sender] -= _value;

    return true;
  }
}
