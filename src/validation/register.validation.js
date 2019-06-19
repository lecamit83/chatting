const validator = require('validator');
module.exports = {
    validateRegister(data) {
        const { name , email, password } = data;
        let errors = {};
        if(validator.isEmpty(name)){
            errors.name = "Name is empty";
        }
        if(!validator.isEmail(email)){
            errors.email = "Email invalid!"
        }

        if(!validator.isLength(password, {min : 6 , max : 30})){
            errors.password = "Password length must inside min=6 and max=30";
        } else if(validator.contains(password, ' ')){
           errors.password = "Password  cannot contain space character"; 
        }
        return {
            errors,
            isValid : Object.keys(errors).length === 0
        }
    }
}