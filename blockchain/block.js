const SHA256 = require('crypto-js/sha256');
const { DIFFICULTY, MINE_RATE } = require('../config')

/*
Criação da Classe Bloco onde se armazena o timeStamp, lastHash, hash, data.
    *Timestamp = Momento em que o bloco foi criado
    *Last Hash = Hash do bloco anterior
    *Hash = Hash do bloco atual
    *Data = Dados do bloco
toString() é uma função que retorna uma string com os dados do bloco.

*/
class Block {
    constructor(timestamp, lastHash, hash, data, nonce, difficulty) {
        this.timestamp = timestamp
        this.lastHash = lastHash
        this.hash = hash
        this.data = data
        this.nonce = nonce
        this.difficulty = difficulty || DIFFICULTY;

    }

    toString() {
        return `Block=
        Timestamp = ${this.timestamp}
        Last Hash = ${this.lastHash.substring(0, 10)}
        Hash = ${this.hash.substring(0, 10)}
        Nonce = ${this.nonce}
        Difficulty = ${this.difficulty}
        Data = ${this.data}
        `
    }

    // Criação do Bloco Genesis, que é o primeiro bloco da blockchain.
    static genesis() {
        return new this('Genesis Time', '-----', 'f1r57-ha5h', [], 0, DIFFICULTY);
    }

    // Criação do Bloco que sera adicionado a blockchain.
    static mineBlock(lastBlock, data) {
        let hash, timestamp;
        const lastHash = lastBlock.hash;
        let { difficulty } = lastBlock;
        let nonce = 0;

        do {
            nonce++;
            timestamp = Date.now()
            difficulty = Block.adjustDifficulty(lastBlock, timestamp)
            hash = Block.hash(timestamp, lastHash, data, nonce, difficulty);
        } while (hash.substring(0, difficulty) !== '0'.repeat(difficulty));

        return new this(timestamp, lastHash, hash, data, nonce, difficulty);
    }

    // SHA - 256. Algorimot usado para fazer a criptografia do hash.
    static hash(timestamp, lastHash, data, nonce, difficulty) {
        return SHA256(`${timestamp}${lastHash}${data}${nonce}${difficulty}`).toString();

    }

    static blockHash(block) {
        const { timestamp, lastHash, data, nonce, difficulty } = block
        return Block.hash(timestamp, lastHash, data, nonce, difficulty)
    }

    static adjustDifficulty(lastBlock, currentTime) {
        let { difficulty } = lastBlock
        difficulty = lastBlock.timestamp + MINE_RATE > currentTime ? difficulty + 1 : difficulty - 1
        return difficulty
    }
}

module.exports = Block;