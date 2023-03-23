/*  
  _______            _            _____       _     _   ____        _   
 |__   __|          | |          / ____|     | |   | | |  _ \      | |  
    | |_ __ __ _  __| | ___ _ __| |  __  ___ | | __| | | |_) | ___ | |_ 
    | | '__/ _` |/ _` |/ _ \ '__| | |_ |/ _ \| |/ _` | |  _ < / _ \| __|
    | | | | (_| | (_| |  __/ |  | |__| | (_) | | (_| | | |_) | (_) | |_ 
    |_|_|  \__,_|\__,_|\___|_|   \_____|\___/|_|\__,_| |____/ \___/ \__|                                                                                                                                              
*/
    import chalk from 'chalk';
    import mineflayer from 'mineflayer';
    import fs from 'fs';
    import readline from 'readline';
    import axios from 'axios';
    import fetch from 'node-fetch'; // Change this line to use node-fetch instead of fetch
    import https from 'https';
    import discordjs from 'discord.js';
    import path from 'path'
    import log4js from 'log4js'
    import { logChat } from './logger.js';
    import http from 'http';
    import { spawn } from 'child_process';
 
    import { displayHelpPage1 } from './funcs/help1.js';
    import { disconnectBot } from './funcs/disconnect.js'
    import { connect } from './funcs/connect.js'    
    import { logChatSystem } from './funcs/logChatSystem.js'            
    import { toggleAutoRelog } from './funcs/autoRelog.js';
    import { listInventory } from './funcs/listInventory.js';

let rawdata = fs.readFileSync('config.json');
let config = JSON.parse(rawdata);
let currentServer = config.serverip;

log4js.configure({
    appenders: {
      file: { type: 'file', filename: 'latest.log' }
    },
    categories: {
      default: { appenders: ['file'], level: 'info' }
    }
  });
  
  const logger = log4js.getLogger();
  
  console.log('Logger initialized: ' + JSON.stringify(logger));
  logChat('TRADERGOLDBOT : ' + 'Logger initialized: ' + JSON.stringify(logger))

  if (fs.existsSync('latest.log')) {
    // Delete latest.log file
    fs.unlinkSync('latest.log');
  }


const filePath = './latest.log';
const numLines = 10;


let options = {
    host: config.serverip,
    port: 25565,
    username: "dontChangeThis",
    password: config["password"],
    version: config["version"],
    viewDistance: "tiny",
    auth: "microsoft",
    logErrors: true,
    plugins : {
        blocks : false,
        sound : false,
        physics : false,
        block_actions : false
    }
};
var bot;
//Timer
const start = Date.now();
console.log(chalk.hex('#55FF55')('Starting timer...'));
logChat('TRADERGOLDBOT : ' + chalk.hex('#55FF55')('Starting timer...'))
function startMinecraft() {


    let options = {
        host: config.serverip,
        port: 25565,
        username: "dontChangeThis",
        password: config["password"],
        version: config["version"],
        viewDistance: "tiny",
        auth: "microsoft",
        logErrors: true,
        plugins : {
            blocks : false,
            sound : false,
            physics : false,
            block_actions : false
        }
    };
    const MAX_PREVIOUS_LINES = 5;
    const previousLines = [];
    bot = mineflayer.createBot(options)
    bot.on('login', function() {
        console.info("[Client] Successfully logged into account");
        logChatSystem("[Client] Successfully logged into account");
        bot.on("message", async(message) => {
            let chat = `${message}`
        
            if(true) {
                let messageColor = []
                let fullMessage = ``
                if(message["extra"]) {
                    message["extra"].forEach(ee => {
                        messageColor.push([ee["color"], ee["text"]])
        
                        let color = ee["color"]
                        let text = ee["text"]
        
                        switch(color) {
                            case "dark_red":
                                fullMessage = fullMessage + chalk.hex('#AA0000')(text)
                            break;
                            case "red":
                                fullMessage = fullMessage + chalk.hex('#FF5555')(text)
                            break;
                            case "gold":
                                fullMessage = fullMessage + chalk.hex('#FFAA00')(text)
                            break;
                            case "yellow":
                                fullMessage = fullMessage + chalk.hex('#FFFF55')(text)
                            break;
                            case "dark_green":
                                fullMessage = fullMessage + chalk.hex('#00AA00')(text)
                            break;
                            case "green":
                                fullMessage = fullMessage + chalk.hex('#55FF55')(text)
                            break;
                            case "aqua":
                                fullMessage = fullMessage + chalk.hex('#55FFFF')(text)
                            break;
                            case "dark_aqua":
                                fullMessage = fullMessage + chalk.hex('#00AAAA')(text)
                            break;
                            case "dark_blue":
                                fullMessage = fullMessage + chalk.hex('#0000AA')(text)
                            break;
                            case "blue":
                                fullMessage = fullMessage + chalk.hex('#5555FF')(text)
                            break;
                            case "light_purple":
                                fullMessage = fullMessage + chalk.hex('#FF55FF')(text)
                            break;
                            case "dark_purple":
                                fullMessage = fullMessage + chalk.hex('#AA00AA')(text)
                            break;
                            case "white":
                                fullMessage = fullMessage + chalk.hex('#FFFFFF')(text)
                            break;
                            case "gray":
                                fullMessage = fullMessage + chalk.hex('#AAAAAA')(text)
                            break;
                            case "dark_gray":
                                fullMessage = fullMessage + chalk.hex('#555555')(text)
                            break;
                            case "black":
                                fullMessage = fullMessage + chalk.hex('#000000')(text)
                            break;
                            default:
                                fullMessage = fullMessage + text
                        }
                    })
                    if(config["chat"]) {
                        console.log(chat.replace(/§([0-9]|a|b|i|k|d|f|e|l|n|c|m|r|o)/gi, ""));
                    }
                    logChat(chat);

                    if (chat.toLowerCase().includes('you currently have')) {
                        let pattern = /\$([0-9,\.]+)/;
                        let bal = fullMessage.match(pattern)[1].replace(/,/g, ''); // remove commas
                        let roundedBal = (config["millions"] ? Math.floor(bal / 1000000) + "m" : Math.floor(bal / 1000) + "k");
                        let message = "The bot has " + roundedBal + "";
                        sendDiscordMessage(message);
                    }
                } else {
                    if(config["chat"]) {
                        console.log(chat) 
                    }
                }
            }
        });

    });
      
    bot.on('kicked', function(reason) {
        console.log("Kicked from server: ", reason);
        logChat('TRADERGOLDBOT : ' + "Kicked from server. ", reason)
    });
    
    bot.on('end', function(reason) {
        console.log("Bot has been disconnected from the server.", reason);
        logChatSystem("Bot has been disconnected from the server. ", reason)
        if(config.autoRelog){
        sendDiscordMessage('Bot disconnected, autoRelog =' + config.autoRelog);
        setTimeout(function() {
            startMinecraft();
        }, 6000)
                }
    });
    
    bot.on('error', (err) => {
        console.log("Error" + err); 
        logChatSystem(err); 
      });
    
}
export { startMinecraft };
startMinecraft();


bot.on("login", () => {
    
    console.log(chalk.hex('#55FF55')(` \n    [${bot.username}] Starting to listen to events!\n `))
    logChat(bot.username + ' has started to listen to events!\n')
});

// ah vars
let pause = false;
let gui = null;







// prototypes

//my version of discord webhook pinger

function sendDiscordMessage(message) {
    const payload = {
      content: message
    };
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    };
    const req = https.request(config['discord']['webhook'], options, res => {
      console.log(`statusCode: ${res.statusCode}`);
      logChat('TRADERGOLDBOT : ' + `statusCode: ${res.statusCode}`)
      res.on('data', d => {
        process.stdout.write(d);
      });
    });
    req.on('error', error => {
      console.error(error);
    });
    req.write(JSON.stringify(payload));
    req.end();
  }



let seeChat = false;


  //Discord Bot Code
  const token = config['discord']['token'];

// Create a new client instance
const client = new discordjs.Client({
     intents: [
        discordjs.GatewayIntentBits.Guilds,
        discordjs.GatewayIntentBits.GuildMembers,
        discordjs.GatewayIntentBits.GuildMessages,
        discordjs.GatewayIntentBits.MessageContent

    ] 
    });

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(discordjs.Events.ClientReady, c => {
	console.log(chalk.hex('#FFFF55')(`Ready! Logged in as ${c.user.tag}`));
    logChat('TRADERGOLDBOT : ' + chalk.hex('#FFFF55')(`Ready! Logged in as ${c.user.tag}`))
});

const prefix = '!'; // your command prefix

// Define a regular expression to match the "!item" command
// Listen for the 'message' event
client.on('messageCreate', message => {

  if (message.content === '!help' || message.content === '!help 1') {
    displayHelpPage1(message);
  }
  
    if (message.content === '!disconnect') {
      disconnectBot(bot, message, config);
    }
    
    if(message.content == '!connect'){
        connect(message);
        logChatSystem('Connecting bot to ' + config.serverip)
    }

    if (message.content == '!autoRelog') {
      toggleAutoRelog(message);
      logChatSystem('autoRelog set to ' + config.autoRelog)
  }

  if (message.content.startsWith('!viewChat')) {
    try {
      const lines = fs.readFileSync('latest.log', 'utf-8')
        .trim()
        .split('\n')
        .reduce((acc, cur) => {
          if (cur !== acc[acc.length - 1]) {
            acc.push(cur);
          }
          return acc;
        }, [])
        .slice(-10)
        .join('\n');
    
      message.reply(`Last 10 lines of chat:\n${lines}`);
    } catch (err) {
      console.log('Error: ' + err);
      message.reply('There was an error while trying to view the chat.');
    }
  }


    if (message.content.startsWith('!send')) {
        const text = message.content.slice(6); 
        console.log(text); 
        logChat('TRADERGOLDBOT : ' + text)
        bot.chat(text);
      }

      if (message.content.startsWith('!setVersion')) {
        const vtext = message.content.slice(12); 
        console.log('Changed version to' + vtext); 
        config.version=vtext;
        logChat('TRADERGOLDBOT : Changed version to ' + vtext)
        message.reply('Changed version to ' + '**' + vtext + '**');
      }

      if (message.content.startsWith('!inventory')) {
        listInventory(message, bot);
      }

  const itemRegex3 = /^!setWebhook1 (.+)$/;
  const matchesAddItem2 = message.content.match(itemRegex3);
  if (matchesAddItem2) {
    // Extract the item name and price from the matches
    const [, webhook1Add] = matchesAddItem2;
  
    console.log(webhook1Add); 
    logChat('TRADERGOLDBOT : ' + webhook1Add)
    config.discord.webhook = webhook1Add;
  
    let updatedData1 = JSON.stringify(config, null, 2);
    fs.writeFileSync('config.json', updatedData1);

    console.log(chalk.hex('#55FFFF')(`Set Webhook1 to **` + config.discord.webhook + '**'));
    logChat('TRADERGOLDBOT : ' + chalk.hex('#55FFFF')(`Set Webhook1 to **` + config.discord.webhook + '**'))
    message.reply(`Set Webhook1 to **` + config.discord.webhook + '**');
  }



  const itemRegex6 = /^!setServer (.+)$/;
  const matchesAddItem5 = message.content.match(itemRegex6);


  if (matchesAddItem5) {
    // Extract the item name and price from the matches
    const [, serverIPAdd] = matchesAddItem5;
      if (serverIPAdd.toLowerCase().includes("hypixel")) {
        logChat("Cannot set Hypixel as server IP.")
        throw new Error("Cannot set Hypixel as server IP.");
    }
    currentServer = serverIPAdd;
    console.log(serverIPAdd); 
    logChat('TRADERGOLDBOT : ' + serverIPAdd)
    config.serverip = serverIPAdd;
  
    let updatedData4 = JSON.stringify(config, null, 2);
    fs.writeFileSync('config.json', updatedData4);

    console.log(chalk.hex('#55FFFF')(`Set Server IP to **` + config.serverip + '**'));
    logChat('TRADERGOLDBOT : ' + chalk.hex('#55FFFF')(`Set Server IP to **` + config.serverip + '**'))
    message.reply(`Set Server IP to **` + config.serverip + '**');
  }




});

// Log in to Discord with your client's token
client.login(token);


client.on('ready', () => {

    console.log('Bot is ready!');
    logChat('TRADERGOLDBOT : ' + 'Bot is ready!')
    const channel = client.channels.cache.get(config.discord.channel);
   channel.send('Bot started. Do !help');
  });
