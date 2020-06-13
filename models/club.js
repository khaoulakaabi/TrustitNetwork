const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

// Create Schema
const schema = new Schema({
    name: {
        type: String,
        required: true,
        match: /[a-z]/

    },
    description: {
        type: String,
        match: /[a-z]/,
        required: true


    },
    size: {
        type: Number,
        required : true,
        match: /[0-9]/

    },
    university: {
        type: String,
        required : true
    } , 
    status: {
        type: String,
        required: true,
        default: 'pending'
    },
    presidents: [{
        type:Schema.ObjectId, 
        ref:"User"
    }],
    projectOwners: [{
        type:Schema.ObjectId, 
        ref:"User"
    }],
    date: {
        type: Date,
        default: Date.now
    },
    projects: [{
        type:Schema.ObjectId, 
        ref:"Project"
    }],
});

schema.plugin(mongoosePaginate);
module.exports = Club = mongoose.model('Club', schema);