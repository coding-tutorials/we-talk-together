FROM node:19-bullseye

# install filebeat
RUN apt-get update
RUN apt-get install wget apt-transport-https -y
RUN wget -qO - https://artifacts.elastic.co/GPG-KEY-elasticsearch | apt-key add -
RUN echo "deb https://artifacts.elastic.co/packages/8.x/apt stable main" | tee -a /etc/apt/sources.list.d/elastic-8.x.list
RUN apt-get update && apt-get install filebeat

# install pm2 (to run app as a service)
RUN npm i -g pm2

WORKDIR /opt/app

COPY ./common .