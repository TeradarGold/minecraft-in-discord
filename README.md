# minecraft-in-discord
Control a Minecraft Java account through a Discord Bot. Only supports Microsoft login and Java edition.

Tutorial for installation on raspberry pi:
https://youtu.be/CAY4Bu00P58

1. Create a new Discord server

2. Go to https://discord.com/developers/applications and create a Discord Bot. Use this guide: https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot

2. Run "firstTimeRun.bat You will need to paste in a webhook link to the channel you would like to use, as well as your Discord bot's token, and a discord channel ID (right click #general and Copy ID to obtain)

3. After you input these, some dependencies should begin to install, please wait, the command prompt window will automatically close.

4. In the Discord Bot Developer Portal, go to the Bot section and enable all "Privileged Gateway Intents". Then give your bot the 'bot' scope and the 'Administrator' permission in the OAuth > URL Generator section.

5. Run the file "start.bat" to start your Discord Bot. In the terminal that opens, you should receive a link to log in to your microsoft minecraft java account.

6. Once logged in, you can head over to the discord channel which you specified and type !help. In order to log the bot onto a server of your choice, make sure to update the version as well as server ip, then do !disconnect followed by !connect

If you want this to run 24/7 on a raspberry pi, instead of doing node main.js, do pm2 start main.js (This requires you to install pm2)
