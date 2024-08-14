# Updating an Image

Sometimes you make changes to your code, rebuild the image and you want to see the changes appear.

Let's start with updating the code

```Javascript
const express= require('express')
const app = express()
app.get("/", (req,res)=>{
    res.send(`     
        <h1> Hello Kubernetes </h1>
        <p> Some new Changes </p>
        `)
})
app.get('/error', (req,res)=>{
    process.exit(1)
})

app.listen(80, ()=>{
    console.log("App is Running...");
    
})
```

Now lets rebuild the image but for Kubernetes to Pick up the new Changes you must also tag the image
with a different variation.

```Docker
kubectl set image deployment/node-object  kub-node-app=ndambuki/kub-node-app:V1
```

The set command will update an existing Image.You have to select the image you want to update 
and set it to the new image _kub-node-app=ndambuki/kub-node-app:V1_

You can always check the status of your update or rollout, in case of an Error it will be Highlighted.

An Example would be if we update with a image that does not exist:

```Docker
kubectl set image deployment/node-object  kub-node-app=ndambuki/kub-node-app:V3 
```

Now if you check the status of your Rollout using this command :

```Docker
kubectl rollout status deployment/node-object
```
This will be the output:
![image_13.png](image_13.png)

and the Dashboard will also show an Error:
![image_14.png](image_14.png)

To resolve the issue you can :

## Undo the Rollout

```Docker
kubectl rollout undo deployment/first-app

```
or

## Set a Valid Image

```Docker
kubectl set image deployment/node-object  kub-node-app=ndambuki/kub-node-app:V1
```

## Deployments History

To check the rollout history  Run this command:

```Docker
kubectl rollout history deployment/node-object
```

All Revision will be output:
![image_15.png](image_15.png)

To show what a revision was about run this command:
```Docker
kubectl rollout history deployment/node-object --revision=4
```
Output:
![image_16.png](image_16.png)

This will be able to show which image was used among other configurations.


You can Shift to a Previous revision using
```Docker
kubectl rollout undo  deployment/node-object --to-revision=1  
```

Now this will show the first version that we had before updating
![image_17.png](image_17.png)

You can go back to the current version by running:
```Docker
kubectl rollout undo  deployment/node-object --to-revision=6 
```
