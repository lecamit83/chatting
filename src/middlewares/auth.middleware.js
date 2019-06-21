const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

module.exports = {
    async verifyAuth(req, res, next) {
         //console.log(req.headers['authorization']);
        try {
            // Get token in header value
            const token = req.headers['authorization'].replace('Bearer ', '');
            
           // console.log(token);

            const decoded = jwt.verify(token, process.env.JWT_SECRET);

           // console.log(decoded);

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