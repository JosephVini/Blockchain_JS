const TransactionPool = require('../transaction-pool')
const Transaction = require('../transaction')
const Wallet = require('../index')
const Blockchain = require('../../blockchain/index')

describe('TransactionPool', () => {
    let tp, bc, wallet, transaction

    beforeEach(() => {
        tp = new TransactionPool()
        wallet = new Wallet()
        bc = new Blockchain()
        transaction = wallet.createTransaction('r4nd0m-4dr355', 30, bc, tp)
    })

    it('adds a transaction to the pool', () => {
        expect(tp.transactions.find(t => t.id === transaction.id)).toEqual(transaction)
    })

    it('updates a transaction in the pool', () => {
        const oldTransaction = JSON.stringify(transaction)
        const newTransaction = transaction.update(wallet, 'n3xt-r3cipi3nt', 50)
        tp.updateOrAddTransaction(newTransaction)

        expect(JSON.stringify(tp.transactions.find(t => t.id === newTransaction))).not.toEqual(oldTransaction)
    })

    it('clear transactions', () => {
        tp.clear()
        expect(tp.transactions).toEqual([])
    })

    describe('mixing valid and corrupt transactions', () => {
        let validTransactions

        beforeEach(() => {
            validTransactions = [...tp.transactions]
            for (let i = 0; i < 6; i++) {
                wallet = new Wallet()
                transaction = wallet.createTransaction('r4nd0m-4dr355', 30, bc, tp);
                if (i % 2 == 0) {
                    transaction.input.amount = 9999;
                } else {
                    validTransactions.push(transaction)
                }
            }
        })

        it('shows a difference between valid and corrupt transactions', () => {
            expect(JSON.stringify(tp.transactions)).not.toEqual(JSON.stringify(validTransactions))
        })

        it('grabs valid transactions', () => {
            expect(tp.validTransactions()).toEqual(validTransactions)
        })
    })
})