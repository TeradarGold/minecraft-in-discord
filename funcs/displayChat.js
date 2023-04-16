import fs from 'fs';

export function displayChat(message) {
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