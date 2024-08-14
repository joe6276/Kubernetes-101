# Scaling
Scaling is one of the most important concept, because it focuses on availability of your application

## Scaling Up
In kubernetes to scale up and down we use a Replicaset.The ReplicaSet ensures that the desired number of replicas (copies) are
running at all times by creating or deleting Pods as needed.

Below Example will create three replicas of the same Container:

```Docker
kubectl scale deployment/node-object  --replicas=3
```

Now If you check your Dashboard you will see two new pods:

![image_11.png](image_11.png)

If you access the error route which will crash the container:
![image_12.png](image_12.png)

But Kubernetes will automatically replace the container with a new Healthy one. While one Container is down
the other two pods can accept URL requests.

## Scale Down
Below Example will downscale from 3 pods to one :

```Docker
kubectl scale deployment/node-object  --replicas=1
```

If you check your dashboard you will have only one pod.

