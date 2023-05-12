FROM node
WORKDIR /opt/app
ADD package.json package.json
RUN npm install --force
ADD . .
ENV NODE_ENV production
RUN npm run build
RUN npm prune --production --force
CMD ["npm", "start"]
EXPOSE 3001