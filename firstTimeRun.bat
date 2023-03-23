@echo off
set /p webhook="Enter your webhook: "
set /p token="Enter your token: "
set /p channel="Enter your channel: "

(
echo {
echo   "discord": {
echo     "webhook": "%webhook%",
echo     "token": "%token%",
echo     "channel": "%channel%"
echo   },
echo   "version": "1.8",
echo   "serverip": "play.example.com",
echo   "chat": true,
echo   "autoRelog": false
echo }
) > config.json

echo Configuration saved to config.json.

npm install