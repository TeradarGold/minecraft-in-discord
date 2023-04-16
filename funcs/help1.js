import fs from 'fs';

let rawdata = fs.readFileSync('config.json');
let config = JSON.parse(rawdata);


function displayHelpPage1(message) {
   let helpSetServer = '!setServer <ip>                                        Sets the server IP to <ip> so you can !connect to a different server\n\n';
    let helpSend = '!send <message>                                      Sends message into minecraft chat ex. !send /bal\n\n';
    let helpViewChat = '!viewChat                                            Displays recent chat messages from ingame as well as debug information\n\n';
    let helpInventory = "!inventory                                           Lists the contents of the bot's inventory\n\n";
    let helpAutoRelog = "!autoRelog                                           Toggles automatically relogging if disconnected from server. Default is off \n\n";
    let helpConnect = "!connect                                            Connects the bot to the saved server ip\n\n";
    let helpDisconnect = "!disconnect                                           Disconnects the bot from the server\n\n";
    let helpSetVersion = "!setVersion                                           Sets the version for the minecraft bot\n\n";
    let helpWebhook1 = "!setWebhook1 <webhook>                               The bot will send important notifications to this channel\n\n"
    let helpRelogDelay = "!relogDelay 100                            Sets the automatic relog delay to x seconds. Default is 20 seconds. \n\n"


    message.reply('```' + helpSetServer + helpSend + helpViewChat + helpInventory + helpAutoRelog + helpConnect + helpDisconnect + helpSetVersion + helpRelogDelay + helpWebhook1 + '```');
  }
  
  export { displayHelpPage1 };
  