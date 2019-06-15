const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

module.exports = {
    async verifyToken(req, res, next) {
            
        try {
            // Get token in header value
            const token = req.headers['authorization'].replace('Bearer ', '');
        
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
            const user = await User.findOne({_id : decoded._id, 'tokens.token' : token});
    
            if(!user){
                throw new Error();
            }
            req.token = token;
            req.user = user;
    
            next();
        } catch (error) {
            res.status(403).send({ error: 'Please authenticate.' })
        }
    }
}