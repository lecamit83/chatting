const { Router } = require('express');
const { getPosts } = require('../controllers/post.controller');
const { registration, getProfile, loggedIn, loggedOut } = require('../controllers/auth.controller');
const { verifyAuth } = require('../middlewares/auth.middleware');
const { verifyRegister } = require('../middlewares/register.middleware');
const { verifyLogin } = require('../middlewares/login.middleware');

const route = Router();

route.get('/posts', getPosts);
route.post('/auth/register', verifyRegister , registration);
route.get('/auth/me',verifyAuth, getProfile);
route.post('/auth/login', verifyLogin, loggedIn);
route.post('/auth/logout',verifyAuth, loggedOut);

module.exports = route;
