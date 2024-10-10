const TelegramBot = require('node-telegram-bot-api');
const path = require('path');
require('dotenv').config();

const token = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

// Listen for incoming messages
bot.on('message', (msg) => {
    const chatId = msg.chat.id;

    // Respond to the '/start' command
    if (msg.text === '/start') {
        bot.sendMessage(chatId, 'Welcome! Send me a photo, video, document, or a URL.');
    } else if (msg.text) {
        // Handle text messages and URLs
        if (msg.text.startsWith('http://') || msg.text.startsWith('https://')) {
            bot.sendMessage(chatId, `You sent a URL: [Click Here](${msg.text})`, { parse_mode: 'Markdown' });
        } else {
            bot.sendMessage(chatId, `I received your message: "${msg.text}".`);
        }
    } else if (msg.photo) {
        // Handle photo messages
        bot.sendMessage(chatId, 'Thank you for the photo! 📸');
    } else if (msg.video) {
        // Handle video messages
        bot.sendMessage(chatId, 'Thank you for the video! 🎥');
    } else if (msg.document) {
        // Handle document messages
        const fileName = msg.document.file_name;
        if (fileName.endsWith('.pdf')) {
            bot.sendMessage(chatId, `Thank you for the PDF document: ${fileName}`);
        } else {
            bot.sendMessage(chatId, `Thank you for the document: ${fileName}`);
        }
    } else {
        bot.sendMessage(chatId, 'I received a non-text message. Please send a photo, video, document, or URL.');
    }
});

// Command to send a PDF file
bot.onText(/\/sendpdf/, (msg) => {
    const chatId = msg.chat.id;
    const pdfPath = path.join(__dirname, 'path/to/your/file.pdf'); // Use absolute path

    bot.sendDocument(chatId, pdfPath)
        .then(() => {
            console.log('PDF sent successfully');
        })
        .catch(err => {
            console.error('Error sending PDF:', err);
        });
});

// Command to send a text file
bot.onText(/\/sendtextfile/, (msg) => {
    const chatId = msg.chat.id;
    const textPath = path.join(__dirname, 'path/to/your/file.txt'); // Use absolute path

    bot.sendDocument(chatId, textPath)
        .then(() => {
            console.log('Text file sent successfully');
        })
        .catch(err => {
            console.error('Error sending text file:', err);
        });
});
