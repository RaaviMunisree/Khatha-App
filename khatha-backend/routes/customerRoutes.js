const express = require('express');
const { auth } = require('../middleware/auth');
const { addCustomer, getCustomers } = require('../controllers/customerController');

const router = express.Router();

router.post('/addCustomer',addCustomer);
router.post('/getCustomers',getCustomers);

module.exports = router;
