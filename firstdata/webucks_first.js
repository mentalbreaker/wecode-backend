const http = require('http');
const express = require('express');
const { sendCategories } = require('./category.js');
const { sendProducts } = require('./productList.js');
const { productDetail } = require('./productDetail.js');

const app = express();
app.use(express.json());

app.get('/', (req, res) => { 
    res.json({ message: '/ endpoint' });
});

app.get('/products/categories', sendCategories);
app.get('/products', sendProducts);
app.get('/products/2', productDetail);

const server = http.createServer(app);

server.listen(8000, () => { 
    console.log('위벅스 서버는 8000번에서 가동중입니다.');
});