const { Schema, model } = require('mongoose');
const thoughtSchema = require("/thoughts")

const userSchema = new Schema(
{
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(value){
                return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(value);
            }
        }
    },
    thoughts: [thoughtSchema],
    friends: [userSchema]
}
);

const User = model('user', userSchema)