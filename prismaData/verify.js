const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

//verification
const verifyToken = async (req, res) => { 
    try { 
        const inputToken = req.headers.web_token;
        let decode = jwt.decode(inputToken);
        //let decode = jwt.verify(inputToken,secretKey);
        /*console.log(inputToken);
        console.log(decode);*/
        
        return res.status(200).json({userInfo:decode});
    } catch (err) { 
        console.log(err)
        return res.status(404).json({message:'BAD_REQUEST'});
    }
}

module.exports = { verifyToken };