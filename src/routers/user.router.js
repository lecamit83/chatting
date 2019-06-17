const { Router } = require('express');
const { getPosts } = require('../controllers/post.controller');
const { registration, getProfile, loggedIn, loggedOut } = require('../controllers/auth.controller');
const { verifyToken } = require('../middlewares/auth.middleware');

const route = Router();

route.get('/posts', getPosts);
route.post('/auth/register', registration);
route.get('/auth/me',verifyToken, getProfile);
route.post('/auth/login', loggedIn);
route.post('/auth/logout',verifyToken, loggedOut);
module.exports = route;
