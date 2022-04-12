const UserAccount = require('../models/user_accounts');
const _ = require('lodash');

const generateActNo = async () => {
  const account_no =  _.random(0000000000, 9999999999);
  const check_account_no = await UserAccount.findOne({account_no}).exec();
  if(check_account_no) generateActNo();
  return account_no;
}

module.exports = generateActNo;