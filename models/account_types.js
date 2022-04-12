const mongoose = require('mongoose');

const accountTypeModel = new mongoose.Schema({
 name: {
    type: String, 
    lowercase: true
 }
}, { timestamps : true})

const accountType = mongoose.model('account_type', accountTypeModel);

module.exports = accountType