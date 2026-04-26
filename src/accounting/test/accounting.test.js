const { expect } = require('chai');
const {
  getBalance,
  resetBalance,
  creditAmount,
  debitAmount,
  writeBalance,
  handleOperation,
} = require('../index');

describe('Accounting application', () => {
  beforeEach(() => {
    resetBalance(1000.0);
  });

  it('should display the initial account balance as 1000.00', () => {
    expect(getBalance()).to.equal(1000.0);
  });

  it('should credit account and update the balance', () => {
    const result = creditAmount(250.0);

    expect(result.success).to.be.true;
    expect(result.newBalance).to.equal(1250.0);
    expect(getBalance()).to.equal(1250.0);
    expect(result.message).to.equal('Amount credited. New balance: 1250.00');
  });

  it('should debit account when sufficient funds are available', () => {
    const result = debitAmount(400.0);

    expect(result.success).to.be.true;
    expect(result.newBalance).to.equal(600.0);
    expect(getBalance()).to.equal(600.0);
    expect(result.message).to.equal('Amount debited. New balance: 600.00');
  });

  it('should not debit account when insufficient funds are available', () => {
    const result = debitAmount(1200.0);

    expect(result.success).to.be.false;
    expect(result.message).to.equal('Insufficient funds for this debit.');
    expect(getBalance()).to.equal(1000.0);
  });

  it('should handle invalid menu selection as invalid choice', async () => {
    const outputs = [];
    const originalLog = console.log;
    console.log = (...args) => outputs.push(args.join(' '));

    await handleOperation('INVALID', {
      question: (prompt, callback) => callback(''),
    });

    console.log = originalLog;

    expect(outputs).to.include('Invalid choice, please select 1-4.');
  });

  it('should allow repeat transactions and maintain a correct running balance', () => {
    const creditResult = creditAmount(100.0);
    expect(creditResult.success).to.be.true;
    expect(getBalance()).to.equal(1100.0);

    const debitResult = debitAmount(50.0);
    expect(debitResult.success).to.be.true;
    expect(getBalance()).to.equal(1050.0);
  });

  it('should read the balance from the data layer', () => {
    expect(getBalance()).to.equal(1000.0);
  });

  it('should write and read an updated balance after credit', () => {
    writeBalance(1100.0);
    expect(getBalance()).to.equal(1100.0);
  });

  it('should write and read an updated balance after debit', () => {
    writeBalance(900.0);
    expect(getBalance()).to.equal(900.0);
  });
});
