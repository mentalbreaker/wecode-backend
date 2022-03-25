const { PrismaClient, Prisma } = require('@prisma/client');
const prisma = new PrismaClient();

//error
function customError(message = "") { 
    this.name = "customError";
    this.message = message;
}
customError.prototype = new Error();
//create
async function createUser(req, res) {
    try { 
        const { email, password, username, address, phone_number } = req.body;
        //console.log('이메일 = ', email, ' 패스워드 = ', password);
        
        //custom Err1 : password is short
        if (password.length < 8) {
            let err = new customError("PASSWORD_TOO_SHORT");
            throw err;
        } else {
        const createUser = await prisma.$queryRaw`
        INSERT INTO users(email,password,username,address,phone_number) VALUES 
        (${email},${password},${username},${address},${phone_number});`;
        return res.status(201).json({ message: "Create Success!" });
        }
    } catch (err) {
         //custom Err2 : same email
        console.log(err);
        if (err.code === 'P2010') { 
            //이렇게 DB에러를 가지고 와서 처리하면 안된다!
            return res.status(409).json({ message: 'Exsisting User!' });
            throw err;
        }
        return res.status(500).json({ message: err });
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

module.exports.createUser = createUser;
module.exports.deleteUser = deleteUser;
module.exports.showUsers = showUsers;
module.exports.updateUser = updateUser;