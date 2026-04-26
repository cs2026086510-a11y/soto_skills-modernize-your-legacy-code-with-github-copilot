#!/usr/bin/env node
const readline = require('readline');

let storageBalance = 1000.0;

function readBalance() {
  return storageBalance;
}

function writeBalance(newBalance) {
  storageBalance = newBalance;
}

function resetBalance(balance = 1000.0) {
  storageBalance = balance;
}

function formatBalance(balance) {
  return balance.toFixed(2);
}

function getBalance() {
  return readBalance();
}

function creditAmount(amount) {
  if (typeof amount !== 'number' || Number.isNaN(amount) || amount < 0) {
    return {
      success: false,
      message: 'Invalid amount. Please enter a valid positive number.',
    };
  }

  const balance = readBalance();
  const newBalance = balance + amount;
  writeBalance(newBalance);

  return {
    success: true,
    newBalance,
    message: `Amount credited. New balance: ${formatBalance(newBalance)}`,
  };
}

function debitAmount(amount) {
  if (typeof amount !== 'number' || Number.isNaN(amount) || amount < 0) {
    return {
      success: false,
      message: 'Invalid amount. Please enter a valid positive number.',
    };
  }

  const balance = readBalance();
  if (balance >= amount) {
    const newBalance = balance - amount;
    writeBalance(newBalance);
    return {
      success: true,
      newBalance,
      message: `Amount debited. New balance: ${formatBalance(newBalance)}`,
    };
  }

  return {
    success: false,
    message: 'Insufficient funds for this debit.',
  };
}

function showMenu() {
  console.log('--------------------------------');
  console.log('Account Management System');
  console.log('1. View Balance');
  console.log('2. Credit Account');
  console.log('3. Debit Account');
  console.log('4. Exit');
  console.log('--------------------------------');
}

async function askQuestion(rl, prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, (answer) => resolve(answer.trim()));
  });
}

async function handleOperation(operationType, rl) {
  if (operationType === 'TOTAL') {
    const balance = readBalance();
    console.log(`Current balance: ${formatBalance(balance)}`);
    return;
  }

  if (operationType === 'CREDIT') {
    const amountValue = await askQuestion(rl, 'Enter credit amount: ');
    const amount = Number(amountValue);
    const result = creditAmount(amount);
    console.log(result.message);
    return;
  }

  if (operationType === 'DEBIT') {
    const amountValue = await askQuestion(rl, 'Enter debit amount: ');
    const amount = Number(amountValue);
    const result = debitAmount(amount);
    console.log(result.message);
    return;
  }

  console.log('Invalid choice, please select 1-4.');
}

async function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  let continueFlag = true;

  while (continueFlag) {
    showMenu();
    const choiceValue = await askQuestion(rl, 'Enter your choice (1-4): ');
    const choice = Number(choiceValue);

    switch (choice) {
      case 1:
        await handleOperation('TOTAL', rl);
        break;
      case 2:
        await handleOperation('CREDIT', rl);
        break;
      case 3:
        await handleOperation('DEBIT', rl);
        break;
      case 4:
        continueFlag = false;
        break;
      default:
        console.log('Invalid choice, please select 1-4.');
    }
  }

  console.log('Exiting the program. Goodbye!');
  rl.close();
}

if (require.main === module) {
  main();
}

module.exports = {
  getBalance,
  resetBalance,
  creditAmount,
  debitAmount,
  readBalance,
  writeBalance,
  formatBalance,
  handleOperation,
  askQuestion,
  showMenu,
  main,
};
