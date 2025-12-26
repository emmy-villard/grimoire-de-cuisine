FROM node:24-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
COPY docker-entrypoint.sh ./
RUN chmod +x ./docker-entrypoint.sh

EXPOSE 8000
ENTRYPOINT ["./docker-entrypoint.sh"]
CMD ["npm", "start"]