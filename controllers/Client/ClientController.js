const User = require('../../models/user');
const UserAccount = require('../../models/user_accounts');
const { success, validation } = require('../../status/Status')
const ClientService = require('../../services/ClientService');
const TransferMoney = require('../../services/TransferMoney');
const TransactionHistory = require('../../models/transaction_histories');
const logger = require('../../config/winston');


class ClientController {

    checkBalance = async (req, res) => {
        const data = req.body
        const { account_type_name } = req.query;
        try {
            const user = req.user;

            const account_type   = await ClientService.checkAccountType(account_type_nam);
            if(!account_type) return res.status(422).json(validation({account_type: "Account Type does not exists"}))

            const act_balance =  await UserAccount.find({
                $and: [ {'user' : user.id}, {'account_type' : account_type.id} ] }).select('balance').exec()
            
            if(act_balance.length) return res.status(200).json(success({message: "Account balance retrieved", user: act_balance[0]}))
            
            return res.status(422).json(validation({message: "User does not have this account type"}))

                
        } catch (error) {
            logger.error({message: error.message, stack: error.stack});
            console.log(error);
        }
    }

    transferMoney = async (req, res) => {
        const { account_type_name } = req.query;
        const { amount, account_no } = req.body
        const user = req.user;

        try {

            // if account type selected is valid
            const account_type = await ClientService.checkAccountType(account_type_name);
            if(!account_type) return res.status(422).json(validation({account_type: "Account Type does not exists"}))
            
            // if sender has the selected account type
            const sender =  await UserAccount.find({
                $and: [ {'user' : user.id}, {'account_type' : account_type.id} ] }).exec();
            if(user.length === 0) return res.status(422).json(validation({message: "User does not have this account type"}))

            // checking receiver account no
            const receiver = await UserAccount.findOne({account_no}).exec();
            if(!receiver) return res.status(422).json(validation({account_no: "Account Number does not exists"}))

            //if sender is sending to the same account no
            if(receiver._id.equals(sender[0]._id)) return res.status(422).json(validation({message: "You cannot transfer to your own account no"}))
            
            // checking if the sender has enough balance
            if(sender[0].balance < amount) return res.status(422).json(validation({message: "Insufficient balance"}))

            //update senders account balance
            const sender_balance = sender[0].balance - Number(amount)
            await TransferMoney.updateSenderAct({_id: sender[0]._id}, {balance: sender_balance});

            //update receiver balance
            const receiver_balance = receiver.balance + Number(amount);
            await TransferMoney.updateReceiverAct({_id: receiver._id}, {balance:receiver_balance });

            //create transaction histories for sender
            await TransferMoney.senderTransactionHistory({
                user_account: sender[0]._id,
                sender: sender[0].user,
                receiver: receiver.user,
                account_type: sender[0].account_type,
                transfer_amount: amount
            })

            //create transaction histories for receiver
            await TransferMoney.receiverTransactionHistory({
                user_account: receiver._id,
                sender: sender[0].user,
                receiver: receiver.user,
                account_type: receiver.account_type,
                received_amount: amount
            })
            
            return res.status(200).json({message: "Money transfered successfully", balance: sender_balance});

        } catch (error) {
            console.log(error);
        }
    }

    checkTransactionHistories = async (req, res) => {
        const user = req.user;

        const { account_type_name } = req.query;
        try {

            const account_type = await ClientService.checkAccountType(account_type_name);
            if(! account_type) return res.status(422).json({account_type: 'account_type does not exists'});

            //if user has the selected account type
            const check_user = await UserAccount.find({
                $and:[ { user:user.id }, { account_type: account_type._id }]
            }).exec();

            if(check_user.length === 0) return res.status(422).json(validation({account_type: "user does not have this account type"}))

            const user_histories = await TransactionHistory.find({user_account:check_user[0]._id}, 'received_amount transfer_amount createdAt').populate('receiver', 'firstname lastname').exec();

            return res.status(200).json(success({message: "Transaction histories retrieved", histories: user_histories}))

        } catch (error) {
            console.error(error);
        }
    }
}

module.exports = new ClientController;