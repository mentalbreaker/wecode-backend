const http = require('http');
const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient;

const routes = require('./modules/routes'); // Route 에 의존성을 가집니다.

const app = express();
app.use(express.json())//for parsing application/json
app.use(routes);

app.get('/ping', (req, res) => { 
    res.json({ message: '/pong' });
});

//서버 맹글기 슬아님 안녕하세요 하하하
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