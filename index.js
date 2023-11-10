const TelegramApi = require('node-telegram-bot-api');
const {gameOptions, againOptions} = require('./options');
const token = '6345723937:AAFCGx9aD-h1i4xyzQhi-c4iAqyjkDI-QEA';

const bot = new TelegramApi(token, {polling: true});

const chats = {};

const startGame = async (chatId) => {
	await bot.sendMessage(chatId, `Сейчас я загадаю цифру от 0 до 9, а ты должен ее угадать!`);
	const randomNumber = Math.floor(Math.random() * 10)
	chats[chatId] = randomNumber;
	await bot.sendMessage(chatId, 'Отгадывай', gameOptions);
}

const start = () => {
	bot.setMyCommands([
		{command: '/start', description: 'Начальное приветствие'},
		{command: '/info', description: 'Получить информацию о пользователе'},
		{command: '/game', description: 'Игра угадай цифру'},
	])
	
	bot.on('message', async msg => {
		const text = msg.text;
		const chatId = msg.chat.id;
	
		if (text === '/start') {
			await bot.sendMessage(chatId, 'https://media.stickers.wiki/hackobobytito/6415064.160.webp')
			return bot.sendMessage(chatId, `Добро пожаловать в телеграм бот! `);
		}
		if (text === '/info') {
			return bot.sendMessage(chatId, `Тебя зовут ${msg.from.first_name} ${msg.from.last_name}`);
		}
		if (text === '/game') {
			return startGame(chatId);		
		}
		return bot.sendMessage(chatId, `Я тебя не понимаю. Поробуй ещё раз!`);
	})
	bot.on('callback_query', async msg => {
		const data = msg.data;
    const chatId = msg.message.chat.id;
//		console.log(	chats[chatId]);
		if (data === '/again') {
			return startGame(chatId);
		}
		if (data == chats[chatId]) {
//			user.right += 1;
			await bot.sendMessage(chatId, `Поздравляю, ты отгадал цифру ${chats[chatId]}`, againOptions);
	} else {
//			user.wrong += 1;
			await bot.sendMessage(chatId, `К сожалению ты не угадал, бот загадал цифру ${chats[chatId]}`, againOptions);
	}

//		bot.sendMessage(chatId, `Ты выбрал цифру ${data}.`);
//		console.log(msg);
	})

}

start();