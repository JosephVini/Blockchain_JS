const ChainUtil = require("../chain-util");

class Transaction {
  constructor() {
    this.id = ChainUtil.id;
    this.input = null;
    this.outputs = [];
  }

  static newTransaction(senderWallet, recipient, amount) {
    const transaction = new this();

    if (amount > senderWallet.balance) {
      console.log(`Amount: ${amount} exceeds balance`)
      return
    }

    transaction.outputs.push(...[{ amount: senderWallet.balance - amount, adress: senderWallet.publicKey }, { amount, adress: recipient }])
    return transaction
  }
}

module.exports = Transaction 
