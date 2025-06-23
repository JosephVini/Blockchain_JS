const Transaction = require('../transaction')
const Wallet = require('../index')

describe('Transaction', () => {
    let transaction, wallet, recipient, amount;

    beforeEach(() => {
        wallet = new Wallet()
        amount = 50
        recipient = 'ChainZen.eth'
        transaction = Transaction.newTransaction(wallet, recipient, amount)

    })

    it('output the `amount` subtracted from the wallet balance', () => {
        expect(transaction.outputs.find(output => output.address == wallet.publicKey).amount).toEqual(wallet.balance - amount);
    })

    it('outputs `amount` added to the recipient', () => {
        expect(transaction.outputs.find(output => output.address == wallet.address).amount).toEqual(amount)
    })

})