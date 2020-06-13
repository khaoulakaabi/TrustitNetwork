const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

const schema = new Schema({
    firstName: {
        type: String,
        required: true,
        match: /[a-z]/
    },
    lastName: {
        type: String,
        required: true,
        match: /[a-z]/
    },
    role: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: {
        type: String,
        required: true,

    },
    status: {
        type: String
    },
    invitationKey: {
        type: String
    },
    activationKey: {
        type: String
    },
    passwordResetKey: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    projects: [{
        type: Schema.ObjectId,
        ref: "Project"
    }]
    // club:{
    //     type: mongoose.Schema.ObjectId, 
    //     ref:"Club"
    // }
});

schema.plugin(uniqueValidator, {
    message: 'is already taken.'
});
schema.plugin(mongoosePaginate);
module.exports = User = mongoose.model("User", schema);