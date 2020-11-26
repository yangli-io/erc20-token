
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

  it('should transfer 1000000 units of Token to the accounts[1]', async function() {
    await this.token.transfer(accounts[1], '1000000', { from: accounts[0] });

    const balanceAccountZero = await this.token.balanceOf(accounts[0]);
    const balanceAccountOne = await this.token.balanceOf(accounts[1]);

    expect(balanceAccountZero.toString()).to.equal('99999000000');
    expect(balanceAccountOne.toString()).to.equal('1000000');
  })

  it('should not allow you to transfer more than you have', async function() {
    let error;
    try {
      await this.token.transfer(accounts[0], '1000001', { from: accounts[1] });
    } catch (e) {
      error = e;
    }
    
    expect(error.message).to.include('INSUFFICIENT_BALANCE')
  })

  it('should approve 100000 units of allowance', async function() {
    const allowance = await this.token.allowance(accounts[0], accounts[1]);

    expect(allowance.toString()).to.equal('0');

    await this.token.approve(accounts[1], '1000000', { from: accounts[0] });

    const allowanceAfter = await this.token.allowance(accounts[0], accounts[1]);

    expect(allowanceAfter.toString()).to.equal('1000000');
  })

  it('should not allow accounts[1] to transfer more than 1000000 of account[0]s balance', async function() {
    let error;
    try {
      await this.token.transferFrom(accounts[0], accounts[2], '1000001', { from: accounts[1] });
    } catch (e) {
      error = e;
    }
    
    expect(error.message).to.include('INSUFFICIENT_ALLOWANCE')
  })

  it('should be able to transfer 1000000 of accounts[0]s balance by accounts[1]', async function() {
    await this.token.transferFrom(accounts[0], accounts[2], '1000000', { from: accounts[1] });

    const balance = await this.token.balanceOf(accounts[2]);

    expect(balance.toString()).to.equal('1000000');

    const allowance = await this.token.allowance(accounts[0], accounts[1]);

    expect(allowance.toString()).to.equal('0');
  })
});