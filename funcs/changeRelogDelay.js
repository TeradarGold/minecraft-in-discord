import fs from 'fs';
let rawdata = fs.readFileSync('config.json');
let config = JSON.parse(rawdata);

export function changeRelogDelay(message) {
    const newRelogDelay = message.content.slice(11).trim();
    config.relogDelay = newRelogDelay;
    fs.writeFile('config.json', JSON.stringify(config), (err) => {
        if (err) {
            message.reply('Error' + err);
        }
        message.reply('Relog Delay set to ' + config.relogDelay);
    });
}