# Service Object 

## Problem 
We now want to access the Pod with the Node app, the pod has an IP address but this can change
anytime if  the pod is moved  or recreated and this will make it hard to track.
To make it easier for clients to access the web application, you can create a 
Kubernetes Service that has a stable IP address. Clients can then connect to that IP, 
and their requests will be routed to one of the Pods running the web application.

**One of the key benefits of using a Service is that it provides a stable endpoint that
doesn't change even if the underlying Pods are recreated or replaced. This makes it much 
easier to update and maintain the application, as clients don't need to be updated with 
new IP addresses.**


Services will allow external access to pods.

```Docker
kubectl expose deployment node-object  --type=LoadBalancer   --port=80
```

To Confirm Creation:
```Docker
kubectl get services

```
Output:

![image_7.png](image_7.png)

Now to run the Service Run this on a terminal with admin privilege:
```Docker
minikube service node-object
```

The above should run  the container and the application on a browser or give you  the URL to the site:

![image_8.png](image_8.png)

When you visit the Site you should see :
![image_9.png](image_9.png)

You can also access the Dashboard using:
```Docker
minikube dashboard
```

This command will open the dashboard on a website, you can check your deployments and even pods :
![image_10.png](image_10.png)


Now if you access the error route, which will crash the application. Kubernetes will automatically recreate a new pod but you will still be able to access the application using the same URl.
**Thanks to services**




