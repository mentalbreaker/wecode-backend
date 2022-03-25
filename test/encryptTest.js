app.post('/login', async (req, res) => { 
    try { 
        const {email, password } = req.body;
        const salt = bcrypt.genSaltSync(10);
        const hash = await bcrypt.hash(password, salt);
        const makeToken = jwt.sign({ id: 2 }, 'secretKey', { expiresIn: '1h' });
        /*console.log('token:', makeToken);
        console.log(`"hash: "${hash},"salt: "${salt},"input password :"${password}`);*/
        return res.status(200).json({message:["hash: "+hash,"salt: "+salt,"input password :"+password,"token: "+makeToken]});
        /*const makeHash = async (password) => { 
            return await bcrypt.hash(password, 10);
        }    
        const printHash = () => { 
            const hashedPassword = await makeHash('mySimplePassword');
            console.log('hashedPassword: ', hashedPassword);
        }*/
    } catch (err) { 
        console.log(err);
        return res.status(404);
    }
    
});