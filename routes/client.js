const express = require('express');
const ClientController = require('../controllers/Client/ClientController');
const verify_role = require('../middlewares/role');
const router = express.Router();
const app = express()

app.use(verify_role('client'));
router.get('/check-balance', ClientController.checkBalance);
router.post('/transfer-money', ClientController.transferMoney)
router.get('/check-histories', ClientController.checkTransactionHistories)

module.exports = router;