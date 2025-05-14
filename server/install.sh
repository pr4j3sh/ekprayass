#!/bin/sh

echo "Deploying..."
git pull origin master
sudo docker-compose down
sudo docker-compose up --build -d