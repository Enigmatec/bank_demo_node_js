const express = require('express');
const AccountTypeController = require('../controllers/Admin/AccountTypeController');
const ClientController = require('../controllers/Admin/ClientController');
const router = express.Router();
const app = express()
const verify_role = require('../middlewares/role');

app.use(verify_role('admin'));
router.post('/users', ClientController.createUser);

router.post('/account-types', AccountTypeController.addAccountType);
router.post('/account-type/user', AccountTypeController.addAccountTypeForUser);


module.exports = router;