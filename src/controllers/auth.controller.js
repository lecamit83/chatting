const User = require('../models/user.model');
module.exports = {
    async registration(req , res) {
        const user = new User(req.body);
        try {
            
            let token = await user.generateToken();
    
            res.status(201).send({user, token});
        } catch (error) {
            res.status(400).send(error);
        }
    },

    async getProfile(req, res) {
        try {
            res.status(200).send(req.user);
        } catch (error) {
            res.status(500).send();
        }
    },
    async loggedIn(req, res){
        try {
            const {email , password} = req.body;
            const user = await User.findByCredentials(email, password);
            const token = await user.generateToken();
            res.status(200).send({user, token});
        } catch (error) {
            res.status(400).send(error);
        }
    },
    async loggedOut(req, res) {
        try {
            let user = req.user;
            user.token = [];
            await user.save();

            res.status(200).send({
                message : 'Log out success!'
            });
        } catch(error) {
            res.status(500).send(error);
        }
    }
}