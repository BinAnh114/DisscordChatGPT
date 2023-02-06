require('dotenv').config();

//connect
const { Client, GatewayIntentBits } = require('discord.js');
const client = new Client({ intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
]})

const { Configuration , OpenAIApi } = require('openai');
const configuration = new Configuration({
    organization: process.env.OPENAI_ORG,
    apiKey: process.env.OPENAI_KEY,
});
const openai = new OpenAIApi(configuration);

client.on('messageCreate', async function(message){
    try{
        if(message.author.bot) return;
        
        const gptResponse= await openai.createCompletion({
            model: "davinci",
            prompt: `ChatGPT is smart bot.\n\
            ChatGPT: Hello, how old are you?\n\
            ${message.author.username}: ${message.content}\n\
            ChatGPT:`,
            temperature: 0.9,
            max_tokens: 1000,
            stop: ["ChatGPT:","Stop Chat"],
        })
       
        message.reply('${gptResponse.data.choices[0.text]}');
        return;
    } catch(err){
        console.log(err)
    }
});

client.login(process.env.DISCORD_TOKEN);
console.log("Chat bot is online on Discord")