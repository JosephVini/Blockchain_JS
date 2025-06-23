const EC = require("elliptic").ec;
const ec = new EC("secp256k1");
const uuidV1 = require("uuid");

class ChainUtil {
  static genKeyPair() {
    return ec.genKeyPair();
  }

  static id() {
    return uuidV1.v1();
  }
}

module.exports = ChainUtil;
