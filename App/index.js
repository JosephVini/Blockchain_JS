const express = require('express')
const Blockchain = require('../blockchain')
const HTTP_PORT = process.env.HTTP_PORT || 3001

/*
HTTP_PORT: 3002 npm run dev
muda a porta do servidor
*/

const app = express()
const bc = new Blockchain()

