
const { validateLogin } = require('../validation/login.validation');
const User = require('../models/user.model');
module.exports = {
    async verifyLogin(req, res, next) {

        try {
            
            const data = {
                email : req.body.email.trim(),
                password : req.body.password
            }

            const { errors , isValid } = validateLogin(data);

            if( !isValid ) {
                return res.status(404).send(errors);
            }

            const { user, errorsLogin } = await User.findByCredentials(data.email, data.password);

            const isValidUser = Object.keys(errorsLogin).length === 0;

            if( !isValidUser ) {
                return res.status(404).send(errorsLogin);
            }

            req.user = user;


            next();
        } catch (error) {
            
            res.status(403).send({ error: 'Please authenticate.' })
        }
    }
}