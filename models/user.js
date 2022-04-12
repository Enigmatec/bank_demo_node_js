const  {mongoose, Schema} = require('mongoose');
const bcrypt = require('bcrypt');

const UserModel = new mongoose.Schema({
  firstname: {
      type: String
  },
  lastname: {
      type: String
  },
  email: {
      type: String,
      unique: true
  },
  role: {
      type: String,
      enum: ['admin', 'client'],
      default: 'client'
  },
  password: {
      type: String,
  },
}, {timestamps: true});

UserModel.pre('save', function (next) {
    if(this.password) {
        this.password = bcrypt.hashSync(this.password, 10)
    }
    next();
});

UserModel.virtual('fullname').get(function () {
    return `${this.firstname} ${this.lastname}`
});

const User = mongoose.model('user', UserModel);

module.exports = User;