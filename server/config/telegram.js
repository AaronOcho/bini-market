const TelegramBot = require('node-telegram-bot-api');

const bot = new TelegramBot('7762890246:AAH0gl9zd4bTe8u43zhVtihYiuYQYkAtsf4', { polling: false });
const ADMIN_TELEGRAM_ID = '7057793599';
const ADMIN_TELEGRAM_USERNAME = '@coletsbini';

module.exports = {
    bot,
    ADMIN_TELEGRAM_ID,
    ADMIN_TELEGRAM_USERNAME
};