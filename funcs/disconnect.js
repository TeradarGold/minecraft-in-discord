function disconnectBot(bot, message, config) {
    bot.quit();
    message.reply('Disconnected bot from server. Auto Relog is currently set to **' + config.autoRelog + '**');
  }

  export { disconnectBot };