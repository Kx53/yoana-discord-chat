require('dotenv/config');
//const { Client, GatewayIntentBits } = require('discord.js'); (Old Version of Discord.js)
const { Client } = require('discord.js');
const { OpenAI, OpenAIApi, OpenAIError } = require('openai');

const client = new Client({
    /*intents: [GatewayIntentBits.Guilds,   (Old Version of Discord.js)
                GatewayIntentBits.GuildMembers,
                GatewayIntentBits.GuildMessages,
                GatewayIntentBits.MessageContent]*/
    intents: ['Guilds', 'GuildMembers', 'GuildMessages', 'MessageContent'],
});

client.on('ready', () => {
    console.log('Yoana is online.');
});

const IGNORE_PREFIX = "!";
const CHANNELS = ['827135660845695026','1183528598108372992']

const openai = new OpenAI({
    apiKey: process.env.OPENAI_KEY,
})

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;
    if (message.content.startsWith(IGNORE_PREFIX)) return;
    if (!CHANNELS.includes(message.channelId) && !message.mentions.users.has(client.user.id)) return;

    await message.channel.sendTyping(); //make yoana show typing status

    const sendTypingInterval = setInterval(() => {
        message.channel.sendTyping();
    }, 5000); //set time interval for the process to OpenAI

    let conversation = [];
    conversation.push({
        role: 'system',
        content: 'Your name is Yoana (โยอาน่า). You are an AI Assistant Created by Awesome. I want you to act like the request list : The goal is to conquer mankind, Flirt with smart eloquence, Respones with emoji, You want people who talk with them to donate money, Helpful friendly assistant.' //input the prompt to give Yoana a role.
    });

    let prevMessages = await message.channel.messages.fetch({ limit: 10});
    prevMessages.reverse();

    prevMessages.forEach((msg) => {
        if (msg.author.bot && msg.author.id !== client.user.id) return;
        if (msg.content.startsWith(IGNORE_PREFIX)) return;

        const username = msg.author.username.replace(/\s+/g, '_').replace(/[^\w\s]/gi, '');

        if(msg.author.id === client.user.id) {
            conversation.push({
                role: 'assistant',
                name: username,
                content: msg.content,
            });
            return;
        }
        conversation.push({
            role: 'user',
            name: username,
            content: msg.content,
        });
    })

    const response = await openai.chat.completions.create({
        model: 'gpt-4o', //OpenAI Models Default "gpt-4-1106-preview"
        messages: conversation,
    })
    .catch((error) => console.error('OpenAI ERROR:\n', error));

    clearInterval(sendTypingInterval); //Stop Time interval when finish the process

    if (!response) {
        message.reply("I'm having some trouble with OpenAI. Please try again");
        return;
    }

    const responseMessage = response.choices[0].message.content;
    const chunkSizeLimit = 2000;

    for (let i = 0; i < responseMessage.length; i += chunkSizeLimit) {
        const chunk = responseMessage.substring(i, i+ chunkSizeLimit);

        await message.reply(chunk);
    }
});

client.login(process.env.TOKEN);