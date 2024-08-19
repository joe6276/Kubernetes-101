FROM node:22-alpine

WORKDIR /app

COPY package*.json /app

RUN npm install

COPY . .

EXPOSE 4000


CMD [ "/app/start.sh" ]

# docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=Root@2024" --name db -v data:/var/opt/mssql   --network test -p 1433:1433 -d mcr.microsoft.com/mssql/server:2019-latest