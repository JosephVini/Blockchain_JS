const Block = require('./block');

/*
Criação da classe Blockchain, que será responsável por gerenciar a cadeia de blocos.
*/
class Blockchain {
    constructor() {
        this.chain = [Block.genesis()];

    }

    addBlock(data) {
        const lastBlock = this.chain[this.chain.length - 1];
        const block = Block.mineBlock(lastBlock, data);
        this.chain.push(block);

        return block;
    }
}

module.exports = Blockchain;