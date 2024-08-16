# Persistent Volume 

So far all the volumes we have interacted with are pod or node dependent. That means when you have new pods or nodes 
the volume won't work in the new pods or nodes.
We need to create a volume at the cluster level, this will all pods and nodes in the cluster to access
this volume.
This is where persistent volume comes in.

Persistent Volumes are Kubernetes objects that represent storage resources in your cluster. 
PVs work in conjunction with Persistent Volume Claims (PVCs), another type of object which permits Pods
to request access to PVs.

We will still use hostPath because we are using minikube and it has only one node.


```Docker
apiVersion: v1
kind: PersistentVolume
metadata:
  name: students-pv
spec:
  capacity:
    storage: 1Gi
  volumeMode: Filesystem
  storageClassName: standard
  accessModes: 
    - ReadWriteOnce
  hostPath:
    path: /data
    type: DirectoryOrCreate 


```

### apiVersion: v1
Specifies the version of the Kubernetes API you're using. In this case, it's v1, used for resources like
PersistentVolume.
### kind: PersistentVolume
   The kind field indicates that you're creating a PersistentVolume (PV). A PV is a piece of storage
   in the cluster that has been provisioned by an administrator or dynamically by a storage class. 
   Pods can claim PVs to store data persistently.
### metadata:
   Contains metadata for the PersistentVolume.
   **_name: host-pv_**: This assigns a name to the PersistentVolume, in this case, host-pv.
   . spec:
   Defines the specification for the PersistentVolume, including the storage capacity, access modes, 
   and volume source. 
### capacity:
   Specifies the size of the storage that the PersistentVolume provides.
   ```Docker 
   capacity:
    storage: 1Gi
   ```
   **storage: 1Gi:** This indicates that the PersistentVolume has a storage capacity of 1 GiB .

### volumeMode: Filesystem
   Defines the type of volume mode.
   Filesystem: This means that the volume will be mounted as a filesystem, where data can be written
   and read like any normal filesystem. The alternative would be Block, which gives raw block storage access. 
### storageClassName: standard
   Specifies the storage class associated with this PersistentVolume.
   **standard**: This binds the PersistentVolume to a specific StorageClass. In this case, it's using a standard 
   storage class (which could be predefined or custom in your cluster). If a PersistentVolumeClaim (PVC) uses
   this storage class, it can claim this PV
### accessModes:
   Specifies how the volume can be mounted by pods.
   ReadWriteOnce: This means the volume can be mounted as read-write by a single node at a time.
   Only one pod can write to this volume, but multiple pods can read from it if they are on the same node. 
### hostPath:
   Defines the backing storage for the PersistentVolume. Here, it uses the hostPath volume type
   **path: /data:** This specifies the directory on the host machine's filesystem that will back the 
   PersistentVolume. In this case, it's /data.

   **type: DirectoryOrCreate**: This ensures that if the /data directory doesn't exist on the host, 
   it will be created automatically. If the directory exists, it will be used as is.
   
To connect to the volume we need PersistentVolumeClaim

## Persistent VolumeClaim

Persistent Volume Claims are requests for storage made by a pod in the cluster. 
They allow pods to consume storage without needing to know the specifics of how it is provisioned

Let's create one that consumes the above volume
```Docker
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: students-pvc
spec:
  volumeName: students-pv
  accessModes:
  - ReadWriteOnce
  storageClassName: standard
  resources:
    requests:
      storage: 1Gi
      
```

### apiVersion: v1 {id="apiversion-v1_1"}
Specifies the version of the Kubernetes API being used. v1 is the appropriate API version for PersistentVolumeClaims.
### kind: PersistentVolumeClaim
   The kind field indicates that you're creating a PersistentVolumeClaim (PVC). A PVC allows you to request storage from the cluster and bind it to a specific pod. 
   ### metadata: {id="metadata_1"}
   Contains metadata for the PersistentVolumeClaim.
   **name: host-pvc**: This gives the PersistentVolumeClaim a unique name, in this case, host-pvc
   ### spec:
   Defines the specification of the PersistentVolumeClaim, including the access mode, storage request, and volume binding.
### volumeName: host-pv
   This field explicitly binds the PersistentVolumeClaim to a specific PersistentVolume by name.
   **volumeName: host-pv:** The PVC will bind to the PersistentVolume named host-pv. This is useful 
   when you have a statically provisioned PersistentVolume that you want to use directly with this claim
   ### accessModes: {id="accessmodes_1"}
   Defines the access modes for the claim, specifying how the volume can be mounted.
   ReadWriteOnce: This means the volume can be mounted as read-write by a single node at a time.
   The volume can be accessed by only one pod in read-write mode, but if the pod is terminated,
   another pod can then access it.
### storageClassName: standard {id="storageclassname-standard_1"}
Specifies the StorageClass to be used for dynamic provisioning or matching against statically provisioned volumes.

**storageClassName: standard:** The PVC will look for a PersistentVolume that matches the standard storage class.
This must match the storage class defined in the PersistentVolume.

### resources:
Specifies the resource requests, such as the amount of storage needed.

**requests: storage: 1Gi:** The PVC is requesting 1 GiB of storage. This must match the capacity of the
PersistentVolume to be bound

In the Deployment file change this

```Docker
    volumes:
        - name: student-volume
          persistentVolumeClaim:
            claimName: students-pvc
```

This connects the pod to the persistent volume claim


Now Apply the changes 

```Docker
kubectl apply -f host-pv.yaml -f host-pvc.yaml -f deployment.yaml
```

The application should now run well .

