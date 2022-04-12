const UserAccount = require('../models/user_accounts')
const TransactionHistory = require('../models/transaction_histories')

class TranferMoney {

    senderTransactionHistory = async (...data) => {
        return await TransactionHistory.create(data)
    }

    receiverTransactionHistory = async (...data) => {
        return await TransactionHistory.create(data)
    }

    //update sender's act balance after transfer
    updateSenderAct = async (filter, update) => {
        return  await UserAccount.findOneAndUpdate(filter, update, {
            returnOriginal: false
        })
    }

    //update receiver's act balance after transfer
    updateReceiverAct = async (filter, update) => {
        return  await UserAccount.findOneAndUpdate(filter, update, {
            returnOriginal: false
        })
    }
}

module.exports = new TranferMoney