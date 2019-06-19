const User = require('../models/user.model');
module.exports = {
    async registration(req , res) {
        const user = new User(req.body);
        try {
            
            let token = await user.generateToken();
    
            res.send({
                status : 201,
                user, 
                token
            });
        } catch (error) {
            res.send({
                error,
                status : 400
            });
        }
    },

    async getProfile(req, res) {
        try {
            res.send({
                status : 200,
                user : req.user
            });
        } catch (error) {
            res.send({
                status : 404,
                error
            });
        }
    },
    async loggedIn(req, res){
        try {
            
            const user = req.user;

            const token = await user.generateToken();
            res.send({
                status : 200,
                user, 
                token
            });
        } catch (error) {
            res.send({
                status: 400,
                error
            });
        }
    },
    async loggedOut(req, res) {
        try {
            let user = req.user;
            user.tokens = [];
            await user.save();

            res.send({
                status : 200,
                message : 'Log out success!',
            });
        } catch(error) {
            res.send({
                status : 500,
                error
            });
        }
    }
}