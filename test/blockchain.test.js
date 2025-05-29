const Block = require('../block');
const Blockchain = require('../blockchain')

describe('Blockchain', () => {

    let corrente;

    beforeEach(() => {
        corrente = new Blockchain();
    })

    it('starts whith genesis block', () => {
        expect(corrente.chain[0]).toEqual(Block.genesis())
    });

    it('adds a new block', () => {
        const data = 'arquivo.pdf'
        corrente.addBlock(data)

        expect(corrente.chain[corrente.chain.length - 1].data).toEqual(data);
    });
})