const AccountType = require('../../models/account_types');
const User = require('../../models/user');
const UserAccount = require('../../models/user_accounts');
const GenerateActNo = require('../../services/GenerateActNo');
const { validation, conflict, created } = require('../../status/Status');
const _ = require('lodash');

class AccountTypeController {

    addAccountType = async (req, res) => {
        try {
            const { name } = req.body;
            if(!name) return res.status(422).json(validation({name: 'name cannot be empty'}));
            const check_type = await AccountType.findOne({name}).exec();
            if(check_type) return res.status(409).json(conflict({message: "account type name already exists"}))

            const data = await AccountType.create({name});
            return res.status(201).json(created({message: 'New Account Type Added', data}))
        } catch (error) {
            console.log(error);
        }
    }

    addAccountTypeForUser = async (req, res) => {
        const data = req.body 
    
        try {

            //checking user existence
           const user  = await User.findById(data.user_id, '_id').exec();
           if(! user) return res.status(422).json(validation({user_id: 'User not found'}))

           //checking account type existence
           const account_type = await AccountType.findById(data.account_type_id, '_id').exec();
           if(! account_type) return res.status(422).json(validation({account_type_id: 'Account type is not found'}))
           
           //check if user has account type
           const check_user = await UserAccount.find({
            $and: [{'user' : data.user_id}, { 'account_type' : data.account_type_id   } ]}).exec()
    
            if(check_user.length) return res.status(409).json(conflict({message: "User already has this account type"}))

           // generating account number
           const account_no = await GenerateActNo();
           const result = await UserAccount.create({
               user: data.user_id,
               account_type: data.account_type_id,
               account_no,
               balance: data.balance
           });

           if(result) return res.status(201).json(created({message: 'New Account type added for user'}));
           

        } catch (error) {
            console.log(error);
        }
    }


}

module.exports = new AccountTypeController