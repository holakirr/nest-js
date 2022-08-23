FROM node:14-alpine
WORKDIR /opt/app
ADD package.json package.json
RUN npm install --legacy-peer-deps
ADD . .
RUN npm run build
RUN npm prun --production
CMD ["node", "./dist/main.js"]