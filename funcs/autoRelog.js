import fs from 'fs';
let rawdata = fs.readFileSync('config.json');
let config = JSON.parse(rawdata);

export function toggleAutoRelog(message) {
    config.autoRelog = !config.autoRelog;
    fs.writeFile('config.json', JSON.stringify(config), (err) => {
        if (err) {
            message.reply('Error' + err);
        }
        message.reply('autoRelog set to ' + config.autoRelog);
    });
}