# Environment Variables


Now let's check how to configure environment variables

First I  will make the folderName to be read from the environment,

```Javascript
const filePath = path.join(__dirname, process.env.FOLDER_NAME, 'text.txt')
```

Now we  have to pass a  value for FOLDER_NAME 

```Docker
   spec:
      containers:
        - name: volumes-container
          image: ndambuki/kub-volume-demo
          env:
            - name: FOLDER_NAME
              value: 'students'
              
```

so we will pass key value pairs where the kwy will be FOLDER_NAME and the value the name of the folder you want to use.



## ConfigMaps

### apiVersion: v1
Specifies the version of the Kubernetes API you're using. v1 is used for basic Kubernetes resources, 
such as ConfigMap. 
###  kind: ConfigMap
   The kind field indicates that this resource is a ConfigMap. A ConfigMap is used to store configuration
   data that can be shared among different pods or services within your Kubernetes cluster.
### metadata:
   Contains metadata, such as the name of the ConfigMap.
   **name: data-store-env**: This gives the ConfigMap a unique name, which can be referenced by pods
   or other resources that need the configuration.
### data:
   The data section stores the key-value pairs of the configuration data.
   **folder: 'students':** This defines a key-value pair within the ConfigMap. The key is folder, and
   the value is 'students'.

   This data can be injected into pods as environment variables or configuration files. 
   For example, you could mount this ConfigMap into a pod, and the application inside the pod could read 
   the value of the folder variable ('students').

```Docker
- name: FOLDER_NAME
   valueFrom:
      configMapKeyRef: 
         name: data-store-env
         key: folder
```

### valueFrom:
This indicates that the value of the environment variable will be sourced from an external resource, such as a ConfigMap or a Secret.
### configMapKeyRef:
   This specifies that the value will come from a ConfigMap
   **name: data-store-env:** This specifies the name of the ConfigMap from which the value will be fetched. 
   In this case, it is data-store-env.
   **key: folder:** This specifies the key inside the ConfigMap whose value you want to retrieve.
   In this case, it's the key folder, which has the value 'students'.