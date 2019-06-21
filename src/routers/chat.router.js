const { Router } = require('express');
const { verifyAuth } = require('../middlewares/auth.middleware');

const { createConversation, replyMessage, getConversations, getConversation } = require('../controllers/chat.controller');
const route = Router();

route.post('/new/:recipient', verifyAuth, createConversation);
route.post('/:conversationId' , verifyAuth , replyMessage);
route.get('/', verifyAuth , getConversations);
route.get('/:conversationId' , verifyAuth, getConversation);
module.exports = route;