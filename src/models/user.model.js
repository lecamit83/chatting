const mongoose = require('mongoose');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;


const userSchema = new Schema({

    name : {
        type: String,
        trim : true,
    },
    email : {
        type : String,
        trim : true,
        lowercase : true,
    },
    password : {
        type: String,
    },
    isActived : {
        type : Boolean,
        default : false,
    },
    tokens : [{
        token : {
            type : String,
        }
    }]
},{ 
    timestamps : true
});

userSchema.methods.toJSON = function(){
    const user = this;
    const objectUser = user.toObject();

    delete objectUser.password;
    
    return objectUser;
}

userSchema.methods.generateToken = async function(){

    const user = this;
    const token = await jwt.sign({_id : user._id.toString()} , process.env.JWT_SECRET, {expiresIn : '7 days'});
    user.tokens = user.tokens.concat({ token });
    user.isActived = true;
    await user.save();

    return token;
}

userSchema.pre('save', async function(next){
    var user = this;
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

userSchema.statics.findByCredentials = async (email, password) => {
    let errorsLogin = {};
    const user = await User.findOne({ email });
    if( !user ){
        errorsLogin.email = "Email invalid";
        return {
            user,
            errorsLogin
        }
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        errorsLogin.password = "Password invalid";
        return {
            user,
            errorsLogin
        }
    }

    return {
        user,
        errorsLogin
    };
}

const User = mongoose.model('User', userSchema);
module.exports = User;