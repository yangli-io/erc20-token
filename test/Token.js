
const { expect } = require('chai');
const Token = artifacts.require("./Token.sol");

contract('Token', function(accounts) {
  beforeEach(async function () {
    this.token = await Token.deployed();
  })

  it('should show correct value for name', async function () {
    const name = await this.token.name();

    expect(name).to.equal('The Awesome Token')
  })

  it('should show correct value for symbol', async function () {
    const name = await this.token.symbol();

    expect(name).to.equal('AWE')
  })
});