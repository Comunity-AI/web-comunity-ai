const bcrypt = require('bcrypt');

export async function hashPassword(plaintextPassword:string) {
    const saltRounds = 10; // You can adjust this value for more or less security
    return await bcrypt.hash(plaintextPassword, saltRounds);
}