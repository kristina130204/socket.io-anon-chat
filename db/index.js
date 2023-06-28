const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://login:pass.v9tynhl.mongodb.net/chat');
const db = mongoose.connection;
module.exports = db;
