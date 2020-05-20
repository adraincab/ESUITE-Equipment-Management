"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = require("bcrypt");
const util_1 = require("util");
class Bcrypt {
}
Bcrypt.compare = util_1.promisify(bcrypt_1.compare).bind(bcrypt_1.compare);
Bcrypt.hash = util_1.promisify(bcrypt_1.hash).bind(bcrypt_1.hash);
Bcrypt.SALT_ROUNDS = 10;
exports.Bcrypt = Bcrypt;
//# sourceMappingURL=bcrypt.js.map