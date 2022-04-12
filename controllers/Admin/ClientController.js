const User = require('../../models/user');
const UserAccount = require('../../models/user_accounts');
const { success, validation } = require('../../status/Status')
const ClientService = require('../../services/ClientService');
const generateActNo = require('../../services/GenerateActNo')
const mongoose = require('mongoose');



class ClientController {

    createUser = async (req, res) => {
        const data = req.body
        try {
    
            const check_email = await ClientService.checkEmail(data.email);
            if(check_email) return res.status(422).json(validation({email: "Email already exists"}))

            const account_type = await ClientService.checkAccountType(data.account_type);

            if(! account_type) return res.status(422).json(validation({account_type: "Account Type does not exists"}))
            
            const new_user = await User.create({...data})

            const account_no =  await generateActNo();

            const user_account = await UserAccount.create({
                user : new_user._id,
                account_type: account_type._id,
                balance: data.balance,
                account_no 
            });

            if(new_user) {
                return res.status(201).json(success({message: "New User Created", user: new_user}))
            }

        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new ClientController;