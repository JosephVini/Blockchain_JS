/*
Criação da Classe Bloco onde se armazena o timeStamp, lastHash, hash, data.
    *Timestamp = Momento em que o bloco foi criado
    *Last Hash = Hash do bloco anterior
    *Hash = Hash do bloco atual
    *Data = Dados do bloco
toString() é uma função que retorna uma string com os dados do bloco.

*/
class Block {
    constructor(timestamp, lastHash, hash, data){
        this.timestamp = timestamp
        this.lastHash = lastHash
        this.hash = hash
        this.data = data
    }

    toString(){
        return `Block=
        Timestamp = ${this.timestamp}
        Last Hash = ${this.lastHash}
        Hash = ${this.hash}
        Data = ${this.data}
        `
    }
}