const {mongoose, Schema } = require('mongoose');
const {generateRefreshToken} = require('../services/GenerateTokens')

const PersonalTokenModel = new mongoose.Schema({
 user_id: {
         type: Schema.Types.ObjectId,
         ref: 'user'
    },
 refresh_token : String,
}, {timestamps : true})

const personalToken = mongoose.model('personal_token', PersonalTokenModel);

module.exports = personalToken;