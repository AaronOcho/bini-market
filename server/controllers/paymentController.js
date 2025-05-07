const pool = require('../config/db');
const { bot, ADMIN_TELEGRAM_ID } = require('../config/telegram');
const { cloudinary } = require('../middleware/upload');

const submitPayment = async (req, res) => {
    try {
        const { postId, telegramUsername, paymentMethod } = req.body;
        
        const result = await cloudinary.uploader.upload(req.file.path);
        
        await pool.query(
            'INSERT INTO orders (post_id, telegram_username, payment_method, payment_screenshot_url) VALUES ($1, $2, $3, $4)',
            [postId, telegramUsername, paymentMethod, result.secure_url]
        );

        await bot.sendPhoto(ADMIN_TELEGRAM_ID, result.secure_url, {
            caption: `New Payment Received!\n\nFrom: ${telegramUsername}\nPayment Method: ${paymentMethod}\nPost ID: ${postId}`
        });

        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = {
    submitPayment
};