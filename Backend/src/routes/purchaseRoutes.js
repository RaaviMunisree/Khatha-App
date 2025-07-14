const express = require('express');
const { auth } = require('../middleware/auth');
const { addPurchase, getPurchases } = require('../controllers/purchaseController');

const router = express.Router();

router.post('/addPurchase',auth,addPurchase);
router.post('/getPurchases',auth,getPurchases);

module.exports = router;