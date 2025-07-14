const express = require('express');
const { auth } = require('../middleware/auth');
const { addPayment, getPayments } = require('../controllers/paymentController');

const router = express.Router();

router.post('/addPayment',auth,addPayment);
router.post('/getPayments',auth,getPayments);

module.exports = router;