# Deployment

In this module we will be deploying a Full-stack application to an EKS.

## EKS
Amazon Elastic Kubernetes Service (Amazon EKS) is a managed Kubernetes service 
that makes it easy for you to run Kubernetes on AWS and on-premises.

But before we dive into deployment . Lets look at the role we play and what kubernetes will help with

![image_28.png](image_28.png)

we will start with the database and backend app which can be found at:
https://github.com/joe6276/Kubernetes-101/tree/master/Kubernetes%20Projects/4.%20Kubernetes-%20Deployment

First we will create a Cluster at AWS 

## Search and Click on EKS
![image_29.png](image_29.png) 

Then Click on add Cluster - Enter the Cluster Name
![image_30.png](image_30.png)

Then we need to give Kubernetes some permissions. so click on create a role
### On select trusted entity
![image_31.png](image_31.png)

Leave the defaults and click on next

###  Add Permissions

![image_32.png](image_32.png)

Here we need the Eks Cluster policy 

### Name Review and Create 

![image_33.png](image_33.png)

give it a name and review the rest 

Then create the role

Now use the role we have created:
![image_34.png](image_34.png)


Click on next
## Cluster Networking 

on the VPC duplicate the Tab and on your AWS Search Cloud Formation

![image_35.png](image_35.png)

click on create stack

Paste this link on the Amazon S3 URL : https://s3.us-west-2.amazonaws.com/amazon-eks/cloudformation/2020-10-29/amazon-eks-vpc-private-subnets.yaml
![image_36.png](image_36.png)

click on Next
![image_37.png](image_37.png)
give it a name

For the next pages leave the defaults and submit to create the VPC.

Once the VPC is created:
![image_38.png](image_38.png)

Back to the Cluster page select It:
![image_39.png](image_39.png)


For the other pages leave the defaults as they are then create the cluster


## Creating Worker Nodes 

Now let create a worker node:
![image_40.png](image_40.png)

click on compute:
![image_41.png](image_41.png)
Give it a name

On the Role part click on create role in IAM console:

### select trusted entity 

![image_42.png](image_42.png)


### Add permissions {id="add-permissions_1"}
Then select these 3 permissions 
Add the newly created role:

![image_43.png](image_43.png)

## Compute and Scaling Configuration

![image_44.png](image_44.png)

Here select the specification of the EC2 instances you want to use.
Also select on the Node group scaling configuration (or go with the default):
![image_45.png](image_45.png)


For the other pages use the default and create the Node group.
Now you have everything set:
![image_46.png](image_46.png)

Now let's create the configuration .

## Database Service

```Docker
apiVersion: v1
kind: Service
metadata:
  name: database-service
spec:
  selector:
    app: database
  type: ClusterIP
  ports:
    - protocol: TCP
      port: 1433
      targetPort: 1433
```

## Database Deployment

```Docker
apiVersion: apps/v1
kind: Deployment
metadata:
   name: database-deployment
spec:
  replicas: 1
  selector:
    matchLabels:
      app: database
  template:
    metadata:
      labels:
        app: database      
    spec:
      containers:
        - name: database
          image: mcr.microsoft.com/mssql/server:2019-latest
          env:
            - name: MSSQL_SA_PASSWORD
              value: Root@2024
            - name: ACCEPT_EULA
              value: 'Y'
```


## Fruit Backend Service

```Docker
apiVersion: v1
kind: Service
metadata:
  name: fruit-service
spec:
  selector:
    app: fruit
  type: LoadBalancer
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80
      
```
## Fruit  Backend Deployment 

```Docker
apiVersion: apps/v1
kind: Deployment
metadata:
   name: fruit-deployment
spec:
  replicas: 1
  selector:
    matchLabels:
      app: fruit
  template:
    metadata:
      labels:
        app: fruit
    spec:
      containers:
        - name: fruit
          image: ndambuki/kub-fruit:latest
          env:
            - name: DB_USER 
              value: 'sa'

            - name: DB_PWD
              value: 'Root@2024'

            - name: DB_NAME
              value: 'Fruits'
```
Before we can apply the changes:

let's configure our .kube config.file (Copy the backup  somewhere )

First configure your AWS: <a href="https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html"> here</a>

Then Run this command:

```Docker
aws eks --region <your region> update-kubeconfig --name <your cluster name>
```
E.g. My configuration

```Docker
aws eks --region us-east-1 update-kubeconfig --name fruits-cluster
```
Now run the configuration:
```Docker
kubectl apply -f database-service.yaml -f database.yaml -f fruit-service.yaml  -f fruit.yaml
```
Now everything should be working well:

![image_47.png](image_47.png)

Then the services
![image_48.png](image_48.png)

The loadBalancer can now run in postman or the browser e.g.:
![image_49.png](image_49.png)

You can also get the added fruits:

![image_50.png](image_50.png)

<tip> On your frontend connect to the backend LoadBalancer then push the image </tip>

### Frontend Service

```Docker
apiVersion: v1
kind: Service
metadata:
  name: frontend-service
spec:
  selector:
    app: frontend
  type: LoadBalancer
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80
```

## Frontend Deployment 
```Docker
apiVersion: apps/v1
kind: Deployment
metadata:
  name: frontend-deployment
spec:
  replicas: 1
  selector: 
    matchLabels:
      app: frontend
  template:
    metadata:
      labels:
        app: frontend
    spec:
      containers:
        - name: frontend
          image: ndambuki/kub-fruit-frontend:latest
```


apply these Changes
```Docker
 kubectl apply -f frontend.yaml -f  frontend-service.yaml
```
And the Application is Live
![image_51.png](image_51.png)