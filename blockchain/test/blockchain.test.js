const Blockchain = require('../index')

describe('Blockchain difficulty adjustament', () => {
    let blockchain;

    beforeEach(() => {
        blockchain = new Blockchain();
    })

    it('should adjust difficulty when block is mined', () => {
        const difficulty = [];

        // Adicionar os blocos na blockchain
        for (let i = 1; i <= 5; i++) {
            blockchain.addBlock(`bloco ${i}`)
            const lastBlock = blockchain.chain[blockchain.chain.length - 1];
            difficulty.push(lastBlock.difficulty);
        }

        // Verifica se pelo menos uma variação ocorreu
        const allSame = difficulty.every(diff => diff === difficulty[0]);
        expect(allSame).toBe(false);

    })
})
