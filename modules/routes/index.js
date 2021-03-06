const express = require('express');
const router = express.Router();

const userRoute = require('./userRoute');
const productRoute = require('./productRoute');

router.use('/user', userRoute);
router.use('/products', productRoute);
module.exports = router;// 이렇게 내보낸 router 는 express app 의 미들웨어로 사용됩니다.