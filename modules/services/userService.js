const { HTTPCustomError } = require('../common/customError');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

const userDao = require('../models/userDao');


//password encode
const salt = bcrypt.genSaltSync(10);

//signUp
const signUp = async (email, password,username,address,phone_number) => { 
    try { 
        if (password.length < 8) { 
            throw new HTTPCustomError(400,"PASSWORD_TOO_SHORT");;
        }
        const user = await userDao.getUserByEmail(email);

        if (user.length !== 0) { 
            throw new HTTPCustomError( 409,"EXSITING_USER");
        }
        
        const encryptPw = await bcrypt.hash(password, salt);

        const newUser = await userDao.createUser(email, encryptPw,username,address,phone_number);
        
        return newUser;

    } catch (err) {
        console.log(err.message);
        throw err;
        //잘못됨:return res.json({message:err.message});
     }
}

//signIn
const signIn = async (email, password) => { 
    try {
        const user = await userDao.getUserInfoByEmail(email);

        if (user.length === 0) {
            throw new HTTPCustomError(400,"INVALID_USER");
        }
       
        const encrypted = user[0].password;
        const pwCehck = bcrypt.compareSync(password, encrypted);

        if (!pwCehck) { 
            throw new HTTPCustomError(400,"INVALID_PASSWORD");
        }
        const token = jwt.sign({ id: user[0].id }, secretKey);

        return token;
     } catch (err) { 
        console.log(err.message);
        throw err;
    }
}

const updateUser = async (email, password, username, address, phone_number) => { 
    try {
        if (password.length < 8) { 
            throw new HTTPCustomError(400,"PASSWORD_TOO_SHORT");
        }
      
        const encryptPw = await bcrypt.hash(password, salt);
        const userUpdated = await userDao.updateUser(email, encryptPw, username, address, phone_number);
        const showUser = await userDao.showUser(email);
        
        return showUser;
    } catch (err) { 
        console.log(err.message);
        throw err;
     }
   
}
const showUsers = async () => { 
    const users = await userDao.showUsers();
    return users;
}

const deleteUser = async (email) => {
    try {
        const deleteUser = await userDao.deleteUserByEmail(email);
        return deleteUser;
    } catch (err) { 
        console.log(err.message);
        throw err;
    }
 }
module.exports = { signUp, signIn, updateUser, showUsers,deleteUser };