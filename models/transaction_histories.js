const { mongoose, Schema } = require('mongoose');
const { format }= require('date-fns');

const transactionModel  = new mongoose.Schema({
user_account:
    {
        type: Schema.Types.ObjectId,
        ref: 'user_account'
    },
sender:
    {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
receiver:
    {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
account_type:
    {
        type: Schema.Types.ObjectId,
        ref:'account_type'
    },
transfer_amount: {
    type: Number
},
received_amount: {
    type: Number
}

}, {timestamps : true});

transactionModel.pre('save', function() {
    this.createdAt = format(this.createdAt, 'yyyy-MM-dd');
})

transactionModel.virtual('transactionDate').get(function() {
    return this.createdAt = Date.now();
});

const Transaction = mongoose.model('transaction_histories', transactionModel);

module.exports = Transaction;