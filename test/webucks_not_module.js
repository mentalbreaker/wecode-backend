const http = require('http');
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

//module list
const { sendCategories } = require('./prismaData/categories.js');
const { sendProducts } = require('./prismaData/productList.js');
const { sendProductDetail } = require('./prismaData/productDetail.js');
const { createUser, deleteUser, showUsers, updateUser } = require('./prismaData/user.js');
const { loginUser } = require('./prismaData/login.js');
const { verifyToken } = require('./prismaData/verify.js');

const app = express();
app.use(express.json())//for parsing application/json

app.get('/ping', (req, res) => { 
    res.json({ message: '/pong' });
});

//01.User data manage
app.post('/user/signup', createUser);
app.post('/user/resign', deleteUser);
app.get('/user', showUsers);
app.put('/user', updateUser);
//02. Read Category
app.get('/category', sendCategories);
//03. Read Products
app.get('/products', sendProducts);
//04. Read Product Detail
app.get('/products:id', sendProductDetail);
//05. Login 
app.post('/login', loginUser);
//06. Verfiy Token
app.get('/user/verification', verifyToken);

//서버 맹글기
const server = http.createServer(app);

//서버 시작
const start = async () => { 
    try { 
        server.listen(8000,()=>console.log(`서버가 8000번 포트에서 가동중입니다.`));
    } catch (err) { 
        console.log(err);
        await prisma.$disconnect()//에러 발생 시 database 연결 종료
    }
};

start();