const {mongoose, Schema} = require('mongoose')

const userAccountModel = new mongoose.Schema({
    user: 
        {
            type: Schema.Types.ObjectId,
            ref: 'user'
        }
    ,
    account_type: 
        {
            type: Schema.Types.ObjectId,
            ref: 'account_type'
        }
    ,
    account_no: {
        type: String,
    },
    balance: {
        type: Number
    },
}, {timestamps : true})

const userAccount = mongoose.model('user_account', userAccountModel)

module.exports = userAccount;