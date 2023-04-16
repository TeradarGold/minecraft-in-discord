import log4js from 'log4js';
import fs from 'fs';

const MAX_PREVIOUS_LINES = 5;
const previousLines = [];

log4js.configure({
  appenders: {
    file: { type: 'file', filename: 'latest.log' }
  },
  categories: {
    default: { appenders: ['file'], level: 'info' }
  }
});

const logger = log4js.getLogger();

if (fs.existsSync('latest.log')) {
  // Delete latest.log file
  fs.unlinkSync('latest.log');
}

export function logChat(chat) {
  if (chat.trim() && !previousLines.includes(chat)) { // Check if chat is not empty or only whitespace, and not already in previousLines
    logger.info(chat);
    previousLines.push(chat);
    if (previousLines.length > MAX_PREVIOUS_LINES) {
      previousLines.shift();
    }
  }
}