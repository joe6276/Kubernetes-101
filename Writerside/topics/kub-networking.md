# Kubernetes Networking

When you have a full-stack application you need the frontend and the backend to communicate with each other,
you also need the backend to communicate with your database.

For example if running an MSSQL the backend need a server name. In Docker you use the database container 
name as the server name. In kubernetes things are different lets check different scenarios :
