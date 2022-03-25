const { HTTPCustomError } = require('../common/customError');
const userService = require('../services/userService');


//01.sign up
const signUp = async (req, res,next) => { 
    try { 
        const { email, password, username, address, phone_number } = req.body;

        if (!email || !password) {
            let err = new HTTPCustomError(400, "KEY_UNDEFINDED");
            throw err;
        }
        //console.log(HTTPCustomError())
        const user = await userService.signUp(email, password,username,address,phone_number);
        
        return res.status(201).json({message:"SIGNUP_SUCCESS",user_id:user.id});
    } catch (err) { 
        console.log(err);
        res.status(err.statusCode || 500).json({message:err.message});
    }
}
//02.sign in
const signIn = async (req, res, next) => { 
    try { 
        const { email, password } = req.body;

        if (!email || !password) {
            throw new HTTPCustomError(400, "KEY_UNDEFINDED");
        }

        const user = await userService.signIn(email, password);

        return res.status(200).json({ webToken:user });
        
    } catch (err) { 
        console.log(err);
        res.status(err.statusCode || 500).json({message:err.message});
    }
}

//03.update
const userUpdate = async (req, res, next) => {
    try { 
        const { email, password, username, address, phone_number } = req.body;
       
        if (!email || !password) {
            throw new HTTPCustomError(400, "KEY_UNDEFINDED");
        }
        const user = await userService.updateUser(email, password, username, address, phone_number);
        
        return res.status(200).json({ message: 'User data Updated.',user:user[0]});
    } catch (err) { 
        console.log(err)
        return res.status(err.statusCode||500).json({ message: err.message });
    }
}
//04.show users
const showUsers = async (req, res, next) => { 
    try {
        const users = await userService.showUsers();

        return res.status(200).json({ users });

    } catch (err) {
        console.log(err);
        return res.status(err.statusCode||500).json({ message: err.message });
      }
}
//05.remove
const resign = async (req, res, next) => { 
    try {
        const email = req.body.email;
        if (!email) {
            throw new HTTPCustomError(400, "KEY_UNDEFINDED");
        }
        console.log(email);
        const deleteUser = await userService.deleteUser(email);
        
        return res.status(204).json({message:'delete Succses'});
    } catch (err) { 
        console.log(err);
        return res.status(err.statusCode||500).json({ message: err.message });
     }
}

module.exports = { signUp, signIn,userUpdate,showUsers,resign };