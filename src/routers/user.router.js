const { Router } = require('express');

const User = require('../models/user.model');

const route = Router();

route.post('/auth/register', async (req , res)=>{
    const l_user = new User(req.body);
    try {
        
        let user = await l_user.generateToken();

        await user.save();

        res.status(201).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});


module.exports = route;
