const express = require('express');
const router = express.Router();
const { upload } = require('../middleware/upload');
const { submitPayment } = require('../controllers/paymentController');

router.post('/submit-payment', upload.single('screenshot'), submitPayment);

module.exports = router;