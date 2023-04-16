import { startMinecraft } from '../main.js';
import fs from 'fs';
let rawdata = fs.readFileSync('config.json');
let config = JSON.parse(rawdata);


function connect(message) {
  let rawdata = fs.readFileSync('config.json');
let config = JSON.parse(rawdata);
    startMinecraft();
    message.reply('Connecting bot to **' + config.serverip + '**');
  }

  export { connect };