# Kubernetes Networking

When you have a full-stack application you need the frontend and the backend to communicate with each other,
you also need the backend to communicate with your database.

For example if running an MSSQL the backend need a server name. In Docker you use the database container 
name as the server name. In kubernetes things are different lets check different scenarios :

Attached Here is a Project:
https://github.com/joe6276/Kubernetes-101/tree/master/Kubernetes%20Projects/3.%20Kubernetes-%20Networking

## About the Project
The project has two API  auth and users . The users API needs to communicate to the Auth API in order 
to get back a hashed password( its simulated - not real) But let's focus on the communication part.


## Pod Internal Communication
We will start by placing both containers in the same pod. When two containers are in the same pod 
you can use localhost because they are running on the same machine. Here is an example of the 
deployment.

![dsa.jpg](dsa.jpg)
### user Service

```Docker
apiVersion: v1
kind: Service
metadata: 
  name: user-service
spec:
  selector:
    app: user
  ports:
    - protocol: 'TCP'
      port: 3000
      targetPort: 3000
  type: LoadBalancer

```

### User Deployment 
```Docker
apiVersion: apps/v1
kind: Deployment
metadata:
  name: user-deployment
spec:
  replicas: 1
  selector:
    matchLabels:
      app: user
  template:
    metadata:
      labels:
        app: user
    spec:
      containers:
        - name: users-api
          image: ndambuki/kubernetes-user-api:latest
          env:
            - name: AUTH_ADDRESS
              value: localhost
        - name: users-auth
          image: ndambuki/kubernetes-auth-api:latest


```

The deployment has two container and I'm passing AUTH_ADDRESS as an environment variable.
which is being used at the User API
```Javascript
const response = await axios.get(`http://${process.env.AUTH_ADDRESS}/hash/${password}`);
```

Now start the service with:

```Docker
minikube service user-service
```

The Project Works Well
![image_52.png](image_52.png)

But sometimes you have the containers on different pods.

## Pod to Pod Communication 
### Auth-Service IP Address
![dsa1.jpg](dsa1.jpg)


Now let's create two deployments  and two services:
### Auth Service 

```Docker
apiVersion: v1
kind: Service
metadata: 
  name: auth-service
spec:
  selector:
    app: auth
  ports:
    - protocol: 'TCP'
      port: 80
      targetPort: 80
  type: ClusterIP

```
Here I used ClusterIP which means that this service won't be accessed from the outside can only
be accessed by pods in the same cluster.

### Auth Deployment 

```Docker

apiVersion: apps/v1
kind: Deployment
metadata:
  name: auth-deployment
spec:
  replicas: 1
  selector:
    matchLabels:
      app: auth
  template:
    metadata:
      labels:
        app: auth
    spec:
      containers:
        - name: auth-api
          image: ndambuki/kubernetes-auth-api:latest
```

Before running the User Deployment lets first get the IP address of the AUTH Service. Run:
```Docker
kubectl get services
```
:
![image_53.png](image_53.png)

Use the ClusterIP as the AUTH_ADDRESS of the User deployment.

### User Deployment {id="user-deployment_1"}
```Docker

apiVersion: apps/v1
kind: Deployment
metadata:
  name: user-deployment
spec:
  replicas: 1
  selector:
    matchLabels:
      app: user
  template:
    metadata:
      labels:
        app: user
    spec:
      containers:
        - name: users-api
          image: ndambuki/kubernetes-user-api:latest
          env:
            - name: AUTH_ADDRESS
              value: "10.108.196.53"
```

The User Service remains the same .

now apply all the changes

```Docker
kubectl apply -f user.yaml -f user-service.yaml -f auth.yaml -f auth-service.yaml
```

The application will still Work
![image_54.png](image_54.png)
But that's a lot of manual work , in terms getting the IP addresses.

## DNS for Services and Pods
Kubernetes creates DNS records for Services and Pods. You can contact Services with 
consistent DNS names instead of IP addresses.

Kubernetes publishes information about Pods and Services which is used to program DNS. 
Kubelet configures Pods' DNS so that running containers can lookup Services by name rather
than IP.

Services defined in the cluster are assigned DNS names. By default, a client Pod's DNS
search list includes the Pod's own namespace and the cluster's default domain.


Cluster by default come with coreDNS which gives us cluster internal domain name for our services.
Here you use: <service_Name>.<namespaces>

Namespace is a way of grouping your services. By default we use the 'default' namespace unless defined.

```Docker
    spec:
      containers:
        - name: users-api
          image: ndambuki/kubernetes-user-api:latest
          env:
            - name: AUTH_ADDRESS
              value: "auth-service.default"
```
We will just change the value of the AUTH_ADDRESS.

The API still works
![image_55.png](image_55.png)

## Special Environment Variables 

There a certain pattern of writing environment variable that is recognized by kubernetes.
```Docker
  const response = await axios.get(`http://${process.env.AUTH_SERVICE_SERVICE_HOST}/hash/${password}`);
```

This pattern has:

```Docker
<SERVICE_NAME>_SERVICE_HOST
```

Even our User service will have the same.
