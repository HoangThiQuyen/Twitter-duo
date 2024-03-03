FROM node:20-alpine3.16

WORKDIR /app

# Dấu dot chỉ thị copy vào trong thư mục /app
COPY package.json .
COPY package-lock.json .
COPY tsconfig.json .
COPY ecosystem.config.js .
COPY .env.production .
#  copy những folder trong src vào trong src của /app
COPY ./src ./src
COPY ./swagger ./swagger

#  cài những package vào trong hệ điều hành alpine
RUN apk add python3
RUN npm install pm2 -g
RUN npm install
RUN npm run build

EXPOSE 3000

# chạy trong container nên chuyển thành pm2-runtime
CMD [ "pm2-runtime", "start", "ecosystem.config.js", "--env", "production" ]