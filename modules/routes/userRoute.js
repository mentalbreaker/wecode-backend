const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');// Route 는 오직 Controller 에만 의존 합니다.

router.post('/signup', userController.signUp);
router.post('/signin', userController.signIn);
router.put('/', userController.userUpdate);
router.post('/resign', userController.resign);
router.get('/', userController.showUsers);
module.exports = router;// 이렇게 내보내면 부모 router 에 자동으로 연결됩니다.