const sendProducts = (res) => { 
    res.end(JSON.stringify({
        products: [
            { id: 1, productName: 'Node', description: 'node.js is awesome' },
            { id: 2, productName: 'express', description: 'express는 node.js를 위한 서버사이드 프레임워크입니다.' },
        ]
    }));
}

module.exports = { sendProducts }
