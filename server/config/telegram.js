const TelegramBot = require('node-telegram-bot-api');

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });
const ADMIN_TELEGRAM_ID = process.env.TELEGRAM_ADMIN_ID;

module.exports = {
    bot,
    ADMIN_TELEGRAM_ID
};