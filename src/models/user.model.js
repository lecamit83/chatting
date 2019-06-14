const mongoose = require('mongoose');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;


const userSchema = new Schema({

    name : {
        type: String,
        required : true,
        trim : true,
    },
    email : {
        type : String,
        trim : true,
        require : true,
        unique : true,
        lowercase : true,

    },
    password : {
        type: String,
        required : true,
        minlength: 7,
    },
    tokens : [{
        token : {
            type : String,
            require : true
        }
    }]
},{ 
    timestamps : true
});

userSchema.methods.toJSON = function(){
    const user = this;
    const objectUser = user.toObject();

    delete objectUser.password;
    delete objectUser.tokens;

    return objectUser;
}

userSchema.methods.generateToken = async function(){
    const user = this;
    const token = await jwt.sign({_id : user._id.toString()} , process.env.JWT_SECRET, {expiresIn : 3600});
    user.tokens = user.tokens.concat({ token });
    return user;
}

userSchema.pre('save', async function(next){
    var user = this;
    if(user.isModified('password')){
        user.password = await bcrypt.hash(user.password, 8);
    }
    next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;