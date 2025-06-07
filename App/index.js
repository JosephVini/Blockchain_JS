const express = require('express')
const Blockchain = require('../blockchain')
const HTTP_PORT = process.env.HTTP_PORT || 3001

/*
HTTP_PORT: 3002 npm run dev
muda a porta do servidor
*/

const app = express()
const bc = new Blockchain()

// requisição de toda a cadeeia de blocos
app.get('/blocks', (req, res) =>{
    res.json(bc.chain)
});

// escutando na determinada HTTP_PORT
app.listen(HTTP_PORT, () => {
    console.log(`Listening on port ${HTTP_PORT}`)
})