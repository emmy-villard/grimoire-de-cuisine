FROM nginx:1.29.4-alpine
RUN apk add --no-cache nodejs npm
WORKDIR /usr/share/nginx/html
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 8000
CMD ["nginx", "-g"]