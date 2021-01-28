const Extra = require('telegraf/extra');
const fetch = require('node-fetch');
require('dotenv').config();

const findCourses = (ctx, args) => {
    const query = args.filter(a => a.indexOf('about=') > -1)[0] || '';
    const language = args.filter(a => a.indexOf('lang=') > -1)[0] || '';
    fetch(`https://www.udemy.com/api-2.0/courses/?search=${query.replace('about=', '')}&language=${language.replace('lang=', '')}&page_size=50&ordering=highest-rated&price=price-free`, {
        headers: {
            "Accept": "application/json, text/plain, */*",
            "Authorization": `Basic Sk4yY3g4RUROTjhEMEhqZnA1dllUMXNEU044b1cySWw3dzE5MFNXRDpwZ04zY0liWG0zbUo1VTZEWGpKcFNJeXFEM2JCbGRjTGpVZ2dKU2dtMmZMVFFsMTE2Q2paY2RaMVNHYlBKcTE3Z2ZDY1c5eWpKYzBtVmdNVlNsQjE1WDVRU1d4ZGpCVmdOUUY4NTFFYUxsV2ttb3ZnY2JGZ0pKMFRPRXJ0RzV1eg==`,
            "Content-Type": "application/json;charset=utf-8"
        }
    })
    .then(response => response.json())
    .then(resp => botResponse(ctx, resp))
    .catch(err => {
        ctx.reply("I didn't find related courses 😢");
    })
}

const botResponse = (ctx, resp) => {
    if (!resp.results || !resp.results.length) {
        ctx.reply(resp.detail);
    }

    const i = Math.floor(Math.random() * resp.results.length)
    const message = getFormattedMessage(i, resp.results);

    ctx.replyWithPhoto(
        message.image,
        Extra.caption(`${message.title}: https://udemy.com${message.url}`).markdown(),
    )
}

const getFormattedMessage = (i, results) => {
    return {
        title: results[i].title,
        url: results[i].url,
        image: results[i].image_480x270
    };
}

module.exports = { findCourses };
