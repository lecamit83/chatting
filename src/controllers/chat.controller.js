const Conversation = require('../models/conversation.model');
const Message = require('../models/message.model');

module.exports = {
	createConversation(req, res) {
		if(!req.params.recipient) {
			return req.send({
				status : 422,
				error : 'Please choose a valid recipient for your message!',
			});
		}
		if(!req.body.contentMessage){
			return req.send({
				status : 422,
				error : 'Please enter a message!',
			});
		}

		const conversation = new Conversation({
			participants : [req.user._id, req.params.recipient]
		});

		conversation.save((error, newConversation)=>{
			if(error){
				return res.send({ error, status : 400 });
			}

			const message = new Message({
				conversationId: newConversation._id,
				body: req.body.contentMessage,
				author: req.user._id
			});

			message.save((error , newMessage)=>{
				if(error){
					return res.send({ error, status : 400 });
				}
				res.json({ message: 'Conversation started!', conversationId: conversation._id, status : 200 });
			});
		})
	},
	replyMessage(req, res){
		const reply = new Message({
			conversationId: req.params.conversationId,
    		body: req.body.contentMessage,
    		author: req.user._id
		});
		reply.save(function(err, sentReply) {
		    if (err) {
		      return res.send({ error: err });
		    }
		    res.json({ message: 'Reply successfully sent!', status : 200 });
		});
	},
	getConversations(req, res) {
		Conversation.find({participants : req.user._id})
		.select('_id')
		.sort('-createdAt')
		.populate({
			path : 'participants',
			select : 'name',
			match : {
				_id : {
					$ne : req.user._id,
				}
			}
		})
		.exec(function(error, conversations){
			if(error) {
				return res.send({status : 400 , error});
			}
			console.log(conversations);
			res.send(conversations)
		});
	},
	getConversation(req, res){
		Message.find({conversationId : req.params.conversationId})
			.select('createdAt body author')
			.sort('+createdAt')
			.populate({
				path: 'author',
				select : 'name',
			})
			.exec(function(error, messages){
				res.send({
					status : 200,
					messages
				})
			});
	}
}
