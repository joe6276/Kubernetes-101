# Host Path Volume
We saw that EmptyDir is pod dependent and we need a solution to that which is Host-path volume

## hostPath
A hostPath volume mounts a file or directory from the host node's filesystem into your Pod.
This is not something that most Pods will need, but it offers a powerful escape hatch for some applications.

We are only going to change the volume configuration:

```Docker
   volumes:
        - name: student-volume
          hostPath:
            path: /data
            type: DirectoryOrCreate 

```

### hostPath: {id="hostpath_1"}
Specifies that this volume type is a hostPath, meaning it will use a directory or file from the host (the node running the pod) and mount it into the container. 

### path: /data
   This is the path on the host machine's filesystem that will be mounted into the container. In this case, it's /data.
   For example, if /data already exists on the host, it will be mounted into the container's filesystem at the corresponding mountPath defined in the container's configuration. 
### type: DirectoryOrCreate
   The type field describes how Kubernetes should handle the directory at the specified path.
   **DirectoryOrCreate**: If the directory /data does not already exist on the host, Kubernetes will create it automatically. If the directory does exist, Kubernetes will use it as is. The directory will persist on the host node even after the pod is deleted.


now apply the changes

```Docker
kubectl apply -f deployment.yaml
```

<tip>
This solves the previous problem with pods
</tip>
<warning>
This volume however runs on one node only  in a case where we are using different nodes (cloud)
it might not be the best solution
</warning>