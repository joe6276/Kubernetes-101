FROM node

WORKDIR /app

COPY package*.json /app

RUN npm install

COPY start.sh  /app/start.sh

COPY . . 


EXPOSE 8000


CMD ["/app/start.sh"]


# docker run -e "ACCEPT_EULA=Y" -e "MSSQL_SA_PASSWORD=Root@2025" --name db -v data:/var/opt/mssql   --network test -p 1433:1433 -d mcr.microsoft.com/mssql/server:2019-latest