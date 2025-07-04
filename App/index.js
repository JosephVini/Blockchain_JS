const express = require('express')
const Blockchain = require('../blockchain')
const HTTP_PORT = process.env.HTTP_PORT || 3001
const P2pServer = require('./p2p-server')
const TransactionPool = require('../wallet/transaction-pool')
const Wallet = require('../wallet/index')
const Miner = require('./Miner')

/*
HTTP_PORT: 3002 npm run dev
muda a porta do servidor
*/
const app = express()
const bc = new Blockchain()
const tp = new TransactionPool();
const wallet = new Wallet()
const p2pServer = new P2pServer(bc, tp);
const miner = new Miner(bc, tp, wallet, p2pServer)

app.use(express.json());

// requisição de toda a cadeia de blocos
app.get('/blocks', (req, res) => {
    res.json(bc.chain)
});

// requisição para adicionar blocos
app.post('/mine', (req, res) => {
    const block = bc.addBlock(req.body.data)
    console.log(`New block added: ${block.toString()}`)

    p2pServer.syncChain();

    res.redirect('/blocks');
})

app.get('/transactions', (req, res) => {
    res.json(tp.transactions)
})

app.post('/transact', (req, res) => {
    const { recipient, amount } = req.body
    const transaction = wallet.createTransaction(recipient, amount, bc, tp)
    p2pServer.broadcastTransaction(transaction)
    res.redirect('/transactions')
})

app.get('/public-key', (req, res) => {
    res.json({ publicKey: wallet.publicKey })
})

app.get('/mine-transactions', (req, res) => {
    const block = miner.mine()
    console.log(`New block added: ${block.toString()}`)
    res.redirect('/blocks')
})

// escutando na determinada HTTP_PORT
app.listen(HTTP_PORT, () => {
    console.log(`Listening on port ${HTTP_PORT}`)
})

p2pServer.listen();