const { Router } = require('express');
const { getPosts } = require('../controllers/post.controller');
const { registration, getProfile, loggedIn } = require('../controllers/auth.controller');
const { verifyToken } = require('../middlewares/auth.middleware');

const route = Router();

route.get('/posts', getPosts);
route.post('/auth/register', registration);
route.get('/auth/me',verifyToken, getProfile);
route.post('/auth/login', loggedIn)
module.exports = route;
