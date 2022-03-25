const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');

//error
function customError(message = "",code) { 
    this.name = "customError";
    this.errorCode = code;
    this.message = message;
}
customError.prototype = new Error();

//password encode
const salt = bcrypt.genSaltSync(10);

//create
async function createUser(req, res) {
    try {
        const { email, password, username, address, phone_number } = req.body;
        //에러는 if문으로 한 에러씩 적어줍니다. (콜백지옥 되지 않도록)
        if (!email || !password) {
            let err = new customError("KEY_UNDEFINDED", 400);
            throw err;
         }
        if (password.length < 8) { 
            let err = new customError("PASSWORD_TOO_SHORT",400);
            throw err;
        }

        const existEmail = await prisma.$queryRaw`
        SELECT email FROM users WHERE email= ${email};`

        if (existEmail.length !== 0) { 
            let err = new customError("EXSITING_USER", 409);
            throw err;
        }

        const encrypt = await bcrypt.hash(password, salt);

        const createUser = await prisma.$queryRaw`
        INSERT INTO users(email,password,username,address,phone_number) VALUES 
        (${email},${encrypt},${username},${address},${phone_number});`;
    
        return res.status(201).json({ message: "SIGNUP_SUCCESS" });

    } catch (err) {
        console.log(err); 
        return res.status(err.errorCode || 500).json({message:err.message });
     }
}
 //show
const showUsers = async (req, res)=>{ 
    try { 
        const showUsers = await prisma.$queryRaw`
        SELECT email, username, password, address, phone_number FROM users;
        `
        return res.status(200).json(showUsers);
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: err.message });
     }
}
//update
async function updateUser(req, res) { 
    try { 
        const { email, password, username, address, phone_number } = req.body;
        const showUsers = await prisma.$queryRaw`
        SELECT email,username,address,phone_number FROM users
        WHERE email=${email};
        `
        console.log(showUsers);
        const updateUser = await prisma.$queryRaw`
        UPDATE users
        SET password =${password}, username=${username}, address=${address}, phone_number=${phone_number}
        WHERE email=${email};
        `
        return res.status(200).json({ message: 'User data Updated.'});
    } catch (err) { 
        console.log(err)
        return res.status(500).json({ message: err.message });
    }
}
 //delete
async function deleteUser(req, res) { 
    try {
        const email = req.body;
        const deleteUser = await prisma.$queryRaw
            `DELETE FROM users WHERE email=${email};`;
        return res.status(204).json({message:'delete Succses'});
    } catch (err) { 
        console.log(err);
        return res.status(500).json({ message: err.message });
     }
}

module.exports = { createUser };
module.exports.deleteUser = deleteUser;
module.exports.showUsers = showUsers;
module.exports.updateUser = updateUser;