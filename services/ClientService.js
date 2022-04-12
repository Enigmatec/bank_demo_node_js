const AccountType = require('../models/account_types');
const User = require('../models/user');
const UserAccount = require('../models/user_accounts');
const { validation } = require('../status/Status');

class ClientService {

    checkEmail = async (email) => {
        const check_user = await User.findOne({email}).exec();
        return check_user;
    }

    checkAccountType = async (name) => {
        const check_account_type = await AccountType.findOne({name}).exec();
        return check_account_type
    }

    updateSenderAct = async (filter, update) => {
        return  await UserAccount.findOneAndUpdate(filter, update, {
            returnOriginal: false
        })
    }

    updateReceiverAct = async (filter, update) => {
        return  await UserAccount.findOneAndUpdate(filter, update, {
            returnOriginal: false
        })
    }

}
module.exports = new ClientService