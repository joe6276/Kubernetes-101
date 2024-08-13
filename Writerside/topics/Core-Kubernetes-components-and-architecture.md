# Core Kubernetes Concepts  & Architecture
![k2.jpg](k2.jpg)

## The Worker Node 
Think of the worker node as one computer/ machine / virtual instance 
These nodes run the container/containers and are managed by the master Node 
![k3.jpg](k3.jpg)
## Kubelet:
The Kubelet is an agent that runs on each node. It communicates with the Kubernetes control plane (the master node) to make sure the containers are running as expected. The Kubelet ensures that containers described in a PodSpec are running and healthy. 

## Container Runtime:
   This is the software responsible for running the containers. Common container runtimes include Docker, containerd, and CRI-O. The container runtime pulls the container images from a container registry and runs them as containers on the node. \
## Kube-proxy:
   Kube-proxy is a network proxy that runs on each node in the Kubernetes cluster. It helps in managing the network rules and communication between services. It ensures that each service can reach any other service in the cluster, handling tasks like load balancing and routing traffic to the correct containers.
## Pods:
   A Pod is the smallest, most basic deployable object in Kubernetes. Each pod represents a single instance of a running process in your cluster. Pods usually contain one or more containers that are tightly coupled and share resources like storage and networking.


## The Master Node 
The master node (also known as the control plane) in Kubernetes is responsible for managing the entire cluster. It coordinates all activities within the cluster, like scheduling workloads, maintaining the desired state, and handling scaling and updates. Here's what's inside a Kubernetes master node:
![k4.jpg](k4.jpg)
## API Server:
   The API Server is the central management entity that exposes the Kubernetes API. It is the front-end for the Kubernetes control plane. All communication with the cluster, including interactions with the nodes, happens through the API Server. It handles RESTful requests and updates the state of the cluster accordingly.
## Controller Manager (kube-controller-manager):
   The Controller Manager runs controllers, which are background processes responsible for maintaining the desired state of the cluster. Examples include the Node Controller (which handles node failures), Replication Controller (which ensures that the correct number of pod replicas are running), and the Endpoints Controller (which manages endpoint objects tied to services).
## Scheduler (kube-scheduler):
   The Scheduler is responsible for placing (or "scheduling") pods onto nodes in the cluster. It looks at the available resources on each node and matches that with the resource requirements of the pods. The scheduler makes decisions to ensure efficient resource utilization and adheres to any constraints defined in the pods' specifications.
## Cloud Controller Manager (optional):
   The Cloud Controller Manager is responsible for managing cloud-specific control logic. It allows Kubernetes to interact with the underlying cloud provider, handling tasks like node provisioning, load balancers, and storage. This component is more relevant if you're running Kubernetes on a public cloud like AWS, GCP, or Azure.