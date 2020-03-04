const crypto = require('crypto');
const pbkdf2 = require('pbkdf2');

const ITERATIONS = 10000;
class Security
{
    static CreatePasswordHash(userPassword)
    {
        const signature = crypto.randomBytes(128).toString("base64");
        const hash = pbkdf2.pbkdf2Sync(userPassword, signature, ITERATIONS, 64).toString("base64");
        return [hash,signature];
    }
    static HashEnteredPassword(enteredPassword, signature)
    {
        return pbkdf2.pbkdf2Sync(enteredPassword, signature, ITERATIONS, 64).toString("base64");
    }
}

module.exports = Security;
