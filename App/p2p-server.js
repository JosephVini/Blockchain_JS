const Websocket = require('ws');

const P2P_PORT = process.env.P2P_PORT || 5001;
const peers = process.env.PEERS ? process.env.PEERS.split(',') : [];

class P2pServer {
    constructor(blockchain, transactionPool) {
        this.blockchain = blockchain;
        this.transactioPool = transactionPool
        this.socket = [];
    }

    listen() {
        const server = new Websocket.Server({ port: P2P_PORT });
        server.on('connection', socket => this.connectSocket(socket));

        this.connectToPeers();

        console.log(`Listening for peer-to-peer connections on: ${P2P_PORT}`);
    }

    connectToPeers() {
        peers.forEach(peer => {
            const socket = new Websocket(peer);
            socket.on('open', () => this.connectSocket(socket));
        })
    }

    connectSocket(socket) {
        this.socket.push(socket);
        console.log(`Socket connected`);
        this.messageHandler(socket);
        this.sendChain(socket);

    }

    sendChain(socket) {
        socket.send(JSON.stringify(this.blockchain.chain));
    }

    sendTransaction(socket, transaction) {
        socket.send(JSON.stringify(transaction))
    }

    messageHandler(socket) {
        socket.on('message', message => {
            const data = JSON.parse(message);
            this.blockchain.replaceChain(data);

        });
    }

    syncChain() {
        this.socket.forEach(socket => this.sendChain(socket))
    }

    broadcastTransaction(transaction) {
        this.socket.forEach(socket => this.sendTransaction(socket, transaction))
    }
}

module.exports = P2pServer