const http = require('http');
const { sendProducts } = require('./sendProducts');

const server = http.createServer((req, res) => {
    /*console.log('request received!!!!');

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({message:'웰컴 투 위코드 서버!Http server withput express framework'}));*/
    const { url, method } = req;
    res.setHeader('Content-type', 'application/json');

    if (url === '/ping') { return res.end(JSON.stringify({ message: '/pong' })); }
    if (url === '/signup' && method === 'POST') {
        return res.end(JSON.stringify({ message: '회원가입 완료' }))
    }
    if (url === '/login' && method === 'POST') {
        return res.end(JSON.stringify({ message: '로그인 완료' }))
    }
    if (url === '/products' && method === 'GET') {
        return sendProducts(res)
}
    
    res.send(JSON.stringify({ message: 'this response answers to every request.' }));
});

/*server.listen(8000, () => { 
    console.log('server is running on PORT 8000');
});*/

server.listen(8000, () => { console.log('이 서버는 8000 포트에서 가동중입니다.'); })