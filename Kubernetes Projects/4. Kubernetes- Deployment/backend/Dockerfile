FROM node

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 80

# CMD["npm", "start"]
CMD [ "/app/start.sh" ]

#docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=Root@2024" --name db -v data:/var/opt/mssql   --network test -p 1433:1433 -d mcr.microsoft.com/mssql/server:2019-latest
#docker run  --name backend   --network test -p 4000:80   -v "C:/Users/hp/Desktop/Docker/session5/backend:/app" -v app/node_modules ndambuki/fruits

