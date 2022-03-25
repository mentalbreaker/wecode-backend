const http = require('http');
const express = require('express');
const { sendProducts } = require('./sendProducts2');

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ message: '/ endpoint' });
});
 
app.post('/signup', (req, res) => { res.json('signup success!') });//첫 번째 인자에 endpoint url 기입
app.post('/login', (req, res) => { res.json('login success!!') });//각각의 요청에 대해 핸들링하는 함수를 두번째 인자로 넣는다.
app.get('/products', sendProducts);

const server = http.createServer(app);

server.listen(8000, () => {
    console.log('server is listening on PORT 8000.');
});