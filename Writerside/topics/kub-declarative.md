# Declarative Approach

Having experienced the huddle of writing kubernetes commands on the terminal, I think its time we come up with a file 
Just like Docker has docker-compose Kubernetes can also receive instructions from a .yaml file

In your  Project folder create a file and  name it deployment.yaml 
(the name can vary but the extension must be .yaml)

Then copy these Commands to your _.yaml file , an explanation of the commands follows that.

```Docker

apiVersion: apps/v1
kind: Deployment
metadata: 
  name: second-app-deployment
spec:
  replicas: 1
  selector:
    matchLabels:
      app: second-app 

  template: 
    metadata:
      labels:
        app: second-app
    spec:
      containers:
        - name: second-node-app
          image: ndambuki/kub-first-app:v1
```
## Deployment File Explanation:
### apiVersion: apps/v1
This specifies the version of kubernetes API you're using. In this case _**apps/v1**_ is the API version used for managing applications like Deployments.

### kind: Deployment

The kind field tells Kubernetes what type of object you're creating. Here, it's a Deployment.
```Javascript
metadata:
name: second-app-deployment
```
This section contains metadata for the deployment, like its name. This allows Kubernetes to uniquely identify this resource.

_**name: second-app-deployment:**_ This assigns a name to your Deployment, which is helpful for identifying and managing the Deployment later o


### Spec
   The spec field defines the desired state for the deployment, including the number of replicas and the configuration of the pods.
### replicas: 1
   This specifies the number of pod replicas you want to run. In this case, you want a single instance (replica) of the pod running. 
### selector:
   The selector tells the Deployment which pods it should manage. It selects pods that have the app: second-app label.
   ```Javascript
   selector:
      matchLabels:
         app: second-app

   ```
**_matchLabels: app: second-app_**: This ensures that only pods with the label app:
second-app will be considered part of this deployment.

### template:
This defines the pod template that will be used for creating the pods

```Javascript
template: 
  metadata:
    labels:
      app: second-app

```

metadata: labels: app: second-app: The pod template is labeled with app: second-app. This is crucial because the selector matches this label to know which pods the Deployment manages.

### containers:
This specifies the containers that will be created within the pods.

```Docker
containers:
  - name: second-node-app
    image: ndambuki/kub-first-app:v1
    
```

- **_name: second-node-app_**: This is the name of the container.
- 
  _**image: ndambuki/kub-first-app:v1:**_  - This specifies the Docker image to be used by the container. Here, it's ndambuki/kub-first-app:v1, which likely refers to a Docker image hosted on a registry like Docker Hub. The tag v1 indicates the version of the image.

<tip>
We have Created now the Deployment but we need a service to be able to access the application so lets create the service first the run both together
</tip>

I a separate .yaml file copy the code below:

```Docker
apiVersion: v1
kind: Service
metadata:
  name: backend
spec:
  selector:
    app: second-app 
  ports:
    - protocol: 'TCP'
      port: 80
      targetPort: 8080
  type: LoadBalancer 
```
## Service File Explanation

### apiVersion: v1
This specifies the version of the Kubernetes API you're using. v1 is the version used for basic resources such as Service.
### kind: Service
   The kind field tells Kubernetes what type of resource you're creating. Here, it's a Service, which is used to expose your application (usually a set of Pods) to the network. 
### metadata:
   This section contains metadata for the service, like its name. This is important for identifying and managing the Service within the Kubernetes cluster.
```Docker
metadata:
  name: backend
```

**_name: backend:_** This assigns a name to your service, in this case, it's named backend.

### spec {id="spec_1"}
The spec field defines the desired state for the service, including the configuration that tells the service how it should behave and how it should route traffic.
### selector: {id="selector_1"}
The selector field tells the service which pods it should route traffic to, based on pod labels.

```Docker
selector:
  app: second-app 
```
**_app: second-app_**: This selector matches the pods with the label app: second-app, which corresponds to the label we defined in the deployment earlier. The service will route traffic to those pods.

### ports
This section defines the ports that the service will expose and how they map to the containers inside the pods.
```Docker
ports:
  - protocol: 'TCP'
    port: 80
    targetPort: 8080

```

### protocol: 'TCP'

This specifies the protocol used for communication. In this case, it's TCP, the most common protocol for network communication.
### port: 80
This is the port on which the service will be exposed externally (i.e., the port clients will connect to).
### targetPort: 8080
This is the port on the container where the application is running. So, the service forwards traffic from port 80 to port 8080 on the matching pods.

### type: LoadBalancer
The type field defines how the service is exposed externally.
LoadBalancer: This means the service will be exposed through load balancer 

Now We have the two Files lets run them


```Docker
kubectl apply -f service.yaml -f deployment.yaml
```

You should receive these output:
![image_19.png](image_19.png)

now start the service


```Docker
minikube service backend
```

You should see the output 
In case you update something always rerun :

```Docker
kubectl apply -f service.yaml -f deployment.yaml
```

<note>
You can still have one .yaml file instead of two
</note>

```Docker
apiVersion: v1
kind: Service
metadata:
  name: backend
spec:
  selector:
    app: second-app 
  ports:
    - protocol: 'TCP'
      port: 80
      targetPort: 8080
  type: LoadBalancer 

---
  
apiVersion: apps/v1
kind: Deployment
metadata: 
  name: second-app-deployment
spec:
  replicas: 1
  selector:
    matchLabels:
      app: second-app 

  template: 
    metadata:
      labels:
        app: second-app
    spec:
      containers:
        - name: second-node-app
          image: ndambuki/kub-first-app:v1
          
          




```

Just make sure the different objects are separated by **---** and also start with the service.