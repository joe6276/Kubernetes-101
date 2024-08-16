# Volumes

Attached  is a Project find the Link here:

<a href="https://github.com/joe6276/Kubernetes-101/tree/master/Kubernetes%20Projects/2.%20Kubernetes-Data"> Volume Project </a>

## Problem

The above project has a student folder which stores students that are added after executing the post 
endpoint. You can also get all the student by executing the get endpoint.

But when we run this in a pod and for one reason or another an error occurs (e.g. executing the error
endpoint which crashes the app) , a new pod will be created and all the previous data will be lost.

This is what we will be solving: **persisting Data** 

## EmptyDir

For a Pod that defines an emptyDir volume, the volume is created when the Pod is assigned to a node.
As the name says, the emptyDir volume is initially empty. All containers in the Pod can read and 
write the same files in the emptyDir volume, though that volume can be mounted at the same or 
different paths in each container. When a Pod is removed from a node for any reason, the data
in the emptyDir is deleted permanently.

A container crashing does not remove a Pod from a node. The data in an emptyDir volume is safe 
across container crashes.

Here is the Dockerfile that will will be built to create an image:
```Docker
FROM node:22-alpine

WORKDIR /app

COPY package*.json /app

RUN npm install

COPY . .

EXPOSE 80

CMD [ "npm","start" ]

```
Let's start by creating a Service:



```Docker
apiVersion: v1
kind: Service
metadata: 
  name: volume-service
spec:
  selector:
    app: volumes
  ports:
    - protocol: 'TCP'
      port: 80
      targetPort: 80
  type: LoadBalancer

```
Then a Deployment:
```Docker 
apiVersion: apps/v1
kind: Deployment
metadata:
  name: volume-object
spec:
  replicas: 1
  selector:
    matchLabels:
      app: volumes
  template:
    metadata:
      labels:
        app: volumes
    spec:
      containers:
        - name: volumes-container
          image: ndambuki/kub-volume-demo
          volumeMounts:
            - mountPath: /app/students
              name: student-volume
      volumes:
        - name: student-volume
          emptyDir: {}

```
Lets understand the Volume part:

```Docker
spec:
      containers:
        - name: volumes-container
          image: ndambuki/kub-volume-demo
          volumeMounts:
            - mountPath: /app/students
              name: student-volume
      volumes:
        - name: student-volume
          emptyDir: {}
```
## Explanation 
### volumeMounts:
   Defines how the container will use volumes by mounting them to specific paths inside the container.
   **mountPath: /app/students:** This specifies the directory inside the container where the volume will be mounted.
   name: student-volume: Refers to the volume that will be mounted at /app/students. - the app id the work directory defined in the image.

### volumes:
Defines the volumes that will be available to the pod. These volumes can be of different types, such as emptyDir,hostPath, persistentVolumeClaim, etc.
name: student-volume: The name of the volume that matches the volumeMount definition above.

**emptyDir: {}**: This creates an emptyDir volume, which is a temporary directory that initially starts empty. It exists as long as the pod is running,
and when the pod is deleted, the data in the emptyDir is lost. 
It's typically used for temporary data storage during pod execution.

Now lets create the deployments:

```Docker
kubectl apply -f service.yaml -f deployment.yaml
```

Start the service:
```Docker
minikube service volume-service
```
Now lets test it using PostMan:

![image_20.png](image_20.png)

As you can see the student was stored Successful and we can confirm by executing the get endpoint.
![image_21.png](image_21.png)

Now lets crash the app , which will force a new container to be created.

execute the error endpoint
![image_23.png](image_23.png)

on your dashboard you should see the container stopping and a new one will start.

![image_22.png](image_22.png)

![image_24.png](image_24.png)

<tip>

Our data still exists because EmptyDir will maintain the data despite container crashing 
</tip>

Now lets start two pods, modify the replica and re-apply the deployment.
```Docker
spec:
   replicas: 2
```
You should see the two pods in your dashboard:
![image_25.png](image_25.png)

Now lets crash one which will force the new request to be forwarded to the active pod. Your dashboard should look like this (for some few seconds before the container is recreated)
![image_26.png](image_26.png)

If you now try getting students the request, it will be forwarded to the new pod created and it will fail:
![image_27.png](image_27.png)

<warning>
EmptyDir is good when using one pod , but when you scale up to two pods it will fail. 
</warning>



