const Block = require('../block');
const Blockchain = require('../index')

describe('Blockchain', () => {

    let corrente;
    let bc;

    beforeEach(() => {
        corrente = new Blockchain();
        bc = new Blockchain();
    })

    it('starts whith genesis block', () => {
        expect(corrente.chain[0]).toEqual(Block.genesis())
    });

    it('adds a new block', () => {
        const data = 'arquivo.pdf'
        corrente.addBlock(data)

        expect(corrente.chain[corrente.chain.length - 1].data).toEqual(data);
    });

    it('validates a valid chain', () => {
        bc.addBlock('500U$');
        expect(corrente.isValidChain(bc.chain)).toBe(true);
    })

    it('invalidates a chain with a corrupt genesis block', () => {
        bc.chain[0].data = '0U$';
        expect(corrente.isValidChain(bc.chain)).toBe(false);
    })

    it('invalidates a corrupt chain', () => {
        bc.addBlock('200U$')
        bc.chain[1].data = '0U$'

        expect(corrente.isValidChain(bc.chain)).toBe(false);
    })

    it('replaces the chain with a valid chain', () => {
        bc.addBlock('600U$')
        corrente.replaceChain(bc.chain)

        expect(corrente.chain).toEqual(bc.chain);
    })

    it('Does not replace the chain with one of less or equal length', () => {
        corrente.addBlock('200U$');
        corrente.replaceChain(bc.chain);

        expect(corrente.chain).not.toEqual(bc.chain);
    })
})