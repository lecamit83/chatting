const User = require('../models/user.model');
const { validateRegister } = require('../validation/register.validation');
module.exports = {
    async verifyRegister(req, res, next) {
        try {
            const data = {
                name : req.body.name.trim(),
                email : req.body.email.trim(),
                password : req.body.password
            }   
            const { errors , isValid } = validateRegister(data);
           // console.log(errors, isValid );
            if(!isValid){
                return res.send({
                    status : 404,
                    errors
                });
            }
            const user = await User.findOne({ email : data.email });

            if(user) {
                errors.email = "Email is exist";
                return res.send({
                    status : 404,
                    errors
                });
            }
           // console.log(errors, isValid);
            
            next();
        } catch (error) {
            res.status(403).send({ error: 'Please authenticate.' })
        }
    }
}