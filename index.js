const Telegraf = require('telegraf');
const { findCourses } = require('./course');
require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN)

bot.command('start', (ctx) => ctx.reply(`Hey ${ctx.from.first_name} 😍! What do you want to learn today?? 📚

/course about=what_do_you_want lang=preferred_language
Example: /course about=reactjs lang=en`)
)

bot.command('course', (ctx) => {
    console.log(`${ctx.from.username} has requested: ${ctx.message.text}`)
    const message = ctx.message.text.replace('/course ', '');
    findCourses(ctx, message.split(' '))
})

bot.launch();
