const { generateAccessToken, generateRefreshToken }  = require('../../services/GenerateTokens')
const User = require('../../models/user');
const PersonalToken = require('../../models/personal_token');
const bcrypt = require('bcrypt');
const { success, forbidden } = require('../../status/Status');
const ClientService = require('../../services/ClientService');

class LoginController {
  
    //login module
    login = async (req, res) => {

        const { email, password }  = req.body;

        if(! email || ! password ) return res.status(422).json({message: 'Email or password is empty'});

        try {
            const user = await ClientService.checkEmail(email);
            if(! user) return res.status(401).json(forbidden())

            const check_password = await bcrypt.compare(password, user.password);
            if(! check_password) return res.status(401).json(forbidden())

            const token_data = {
                email: user.email,
                role: user.role
            }

            const access_token = generateAccessToken(token_data);
            const refresh_token = generateRefreshToken(token_data);

            const personal_token = await PersonalToken.findOne({user_id : user._id}).exec();            
            if(personal_token) {
                personal_token.refresh_token = refresh_token;
                await personal_token.save();
            }
            else {
                await PersonalToken.create({user_id: user._id, refresh_token});
            }
            
            return res.status(200).json(success({token: access_token, user}))
            
        } catch (error) {
            console.error(error);
        }
       
    }
}

module.exports = new LoginController