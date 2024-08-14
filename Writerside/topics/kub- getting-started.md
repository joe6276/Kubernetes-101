# Kubernetes Getting Started
Let's  try running a project on Kubernetes

Below is the code Snippet:

```Javascript
const express= require('express')
const app = express()
app.get("/", (req,res)=>{
    res.send(`     
        <h1> Hello Kubernetes </h1>
        `)
})
app.get('/error', (req,res)=>{
    process.exit(1)
})

app.listen(80, ()=>{
console.log("App is Running...");

})
```
We Still need to Come up with a Docker Image (The image will be running in the pods)

Below are the Docker commands to create the Image:
```Docker

FROM node:22-alpine

WORKDIR /app

COPY package*.json /app

RUN npm install

COPY . .

EXPOSE 80

CMD [ "npm", "start" ]
```

To build the Image Run 

```Docker
docker build -t node-app .  
```

Let's create a Pod that will run this image, to do this we will use the deployment object, Run this Command:

```Docker
kubectl create deployment node-object --image=node-app
```



<p>
This command will create a deployment object called node-object from an Image called node-app. The image is supposed to run in a pod which will be automatically created for you
</p>

To check the active Deployments Run:
```Docker
kubectl get deployments
```
This Should be the output :
![image_2.png](image_2.png)

Now let's get all the Pods

```Docker
kubectl get pods
```
![image_3.png](image_3.png)

The above might also display error in the status tab. This means that the image never built.

<tip>
 <format style="bold" color="#00FF00">The Cluster will try to pull 
the images from a Container Registry( e.g. DockerHub, ECR ) but in our case the Image is located locally.</format>
</tip>

So now lets Push the Image to DockerHub, then the Cluster can pull from there.


Fist Create a repository in your DockerHub:
![image_5.png](image_5.png)

Then tag you Image with the new Name

```Docker
docker tag node-app ndambuki/kub-node-app
```

The Push the Image to your Docker Hub

```Docker
docker push  ndambuki/kub-node-app   
```

Now we can Delete the Previous Deployment since it failed and Recreate again

Delete:
```Docker
 kubectl delete  deployment node-object 
```

Recreate and pass the right image( From DockerHub):

```Docker
kubectl create deployment node-object --image=ndambuki/kub-node-app
```

Now when we get pods we should see the Container Running:
```Docker
kubectl get pods
```
Output :
![image_6.png](image_6.png)


But we still are not able to access the application : Lets look at another Object (Service object )