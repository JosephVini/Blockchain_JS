const Block = require('./block');

const block = new Block('7675', 'asdaasd5487662', '8765dfe86ASD', '100');
console.log(block.toString());
console.log(Block.genesis().toString());

const primeiroBloco = Block.mineBlock(Block.genesis(), '$500');
console.log(primeiroBloco.toString());