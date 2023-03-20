@echo off
cls
echo This script will keep your server running even after crashing!
title Minecraft WatchDog
:StartServer
start /wait java -Xmx2G -jar fabric-server-mc.1.19.2-loader.0.14.17-launcher.0.11.2.jar
echo (%time%) Server closed/crashed... restarting!
goto StartServer