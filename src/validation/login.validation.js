
const validator = require('validator');

module.exports = {
	validateLogin(data){
		
		const errors = {};
		const { email , password } = data;

		if(validator.isEmpty(email)){
			errors.email = "Email is empty";
		}else if(!validator.isEmail(email)){
			errors.email = "Email invalid";
		}
		
		if(!validator.isLength(password, {min : 6, max : 30})){
			errors.password = "Password length must to be min = 6 and max = 30";
		} else if(validator.contains(password , ' ')) {
			errors.password = "Password cannot contains space characters";
		}

		return {
			errors,
			isValid : Object.keys(errors).length === 0
		}
	}
}