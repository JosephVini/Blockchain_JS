const express = require('express')
const Blockchain = require('../blockchain')
const HTTP_PORT = process.env.HTTP_PORT || 3001
const P2pServer = require('./p2p-server')

/*
HTTP_PORT: 3002 npm run dev
muda a porta do servidor
*/
const app = express()
const bc = new Blockchain()
const p2pServer = new P2pServer(bc);

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

// escutando na determinada HTTP_PORT
app.listen(HTTP_PORT, () => {
    console.log(`Listening on port ${HTTP_PORT}`)
})

p2pServer.listen();