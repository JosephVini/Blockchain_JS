const Websocket = require('ws');

const P2P_PORT = process.env.P2P_PORT || 5001;
const peers = process.env.PEERS ? process.env.PEERS.split(',') : [];

class P2pServer {
    constructor(blockchain) {
        this.blockchain = blockchain;
        this.socket = [];
    }

    listen() {
        const server = new Websocket.Server({ port: P2P_PORT });
        server.on('conection', socket => this.connectSocket(socket));

        this.connectToPeers();

        console.log(`Listening for peer-to-peer connections on: ${P2P_PORT}`);
    }

    connectToPeers() {
        peers.forEach(peers => {
            const socket = new Websocket(peers);
            socket.on('open', () => this.connectSocket(socket));
        })
    }

    connectSocket(socket) {
        this.socket.push(socket);
        console.log(`Socket connected`);
    }

}

module.exports = P2pServer