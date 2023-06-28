const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    text: String
}, {timestamps: true});

const Message = mongoose.model('Message', schema);
module.exports = Message;