const { Router } = require('express');
const { getPosts } = require('../controllers/post.controller');
const { registration, getProfile, loggedIn, loggedOut } = require('../controllers/auth.controller');
const { verifyToken } = require('../middlewares/auth.middleware');
const { verifyRegister } = require('../middlewares/register.middleware');
const { verifyLogin } = require('../middlewares/login.middleware');

const route = Router();

route.get('/posts', getPosts);
route.post('/auth/register', verifyRegister , registration);
route.get('/auth/me',verifyToken, getProfile);
route.post('/auth/login', verifyLogin, loggedIn);
route.post('/auth/logout',verifyToken, loggedOut);

module.exports = route;
