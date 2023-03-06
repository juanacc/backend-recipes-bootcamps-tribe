
const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    localId: {
        type: String,
        required: false,
        default: 'G996DFgey3gSpvSzux04ySzErkR2'
    },
    expiresIn: {
        type: String,
        require: false,
        default: '3600'
    },
    idToken: {
        type: String,
        require: false,
        default: ''
    }
});

UserSchema.methods.toJSON = function() {
    const { __v, password, _id, ...user  } = this.toObject();
    user.uid = _id;
    return user;
}

module.exports = model( 'User', UserSchema );
