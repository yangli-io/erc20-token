
const { expect } = require('chai');
const Token = artifacts.require("./Token.sol");

contract('Token', function(accounts) {
  const totalBalance = '100000000000';

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

  it(`should have 6 decimals and a totalSupply of ${totalBalance}`, async function () {
    const decimals = await this.token.decimals();
    const totalSupply = await this.token.totalSupply();

    expect(decimals.toString()).to.equal('6');
    expect(totalSupply.toString()).to.equal(totalBalance);
  })

  it('should give all total balance to accounts[0]', async function () {
    const balance = await this.token.balanceOf(accounts[0]);

    expect(balance.toString()).to.equal(totalBalance)
  })
});