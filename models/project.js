const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: true,
        match: /[a-z]/

    },

    description: {
        type: String,
        required: true,
        match: /[a-z]/

    },
    status: {
        type: String,
        required: true,
        default: 'pending'
    },
    club: {
        type: Schema.ObjectId, 
        ref:"Club"
    },
    owner: {
        type: Schema.ObjectId, 
        ref:"User"
    },
    members: [{
        type: Schema.ObjectId, 
        ref:"User"
    }],
    date: {
        type: Date,
        default: Date.now
    }
});

schema.plugin(mongoosePaginate);
module.exports = Project = mongoose.model("Project", schema);