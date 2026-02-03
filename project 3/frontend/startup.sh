#!/bin/bash
# Startup script for Azure App Service (Linux Node.js)
# Serves static files using a simple Node.js HTTP server

cd /home/site/wwwroot
npx http-server -p 8080 -a 0.0.0.0
