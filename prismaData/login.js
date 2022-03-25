const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;
//error
const customError = (message = "", code) => { 
    this.name = "customError";
    this.errorCode = code;
    this.message = message;
}
customError.prototype = new Error();

//loginUser API
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !password) {
            let err = new customError("KEY_ERROR", 400);
            throw err;
        }

        const existEmail = await prisma.$queryRaw`
        SELECT id,email,password FROM users WHERE email= ${email};`

        if (existEmail.length === 0) {
            let err = new customError("INVALID_USER", 400);
            throw err;
        }
        
        const encrypted = existEmail[0].password;
        const pwCehck = bcrypt.compareSync(password, encrypted);
        
        if (!pwCehck) { 
            let err = new customError("INVALID_PASSWORD", 400);
            throw err;
        }
        console.log(secretKey);
        const token = jwt.sign({ id: existEmail[0].id }, secretKey);
       // const makeToken = jwt.sign({ id: 2 }, 'secretKey', { expiresIn: '1h' });

        return res.status(200).json({ web_token:token });
       
    } catch (err) {
        console.log(err);
        return res.status(err.errorCode).json({message:err.message});
    }
}

module.exports = { loginUser };

       
  

