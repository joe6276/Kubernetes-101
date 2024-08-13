# Kubernetes Installation 

### We need to install Two Tools: 
<list type="bullet">
<li> Kubectl </li>
<li> Minikube </li>
</list>


## KubeCtl
The Kubernetes command-line tool, kubectl, allows you to run commands against Kubernetes clusters. You can use kubectl to deploy applications, inspect and manage cluster resources, and view logs.

<procedure title="Instaling KubeCtl" id="inject-a-procedure">
    <step>
        <p>Download Chocolatey </p>
        <a href="https://chocolatey.org/install">Chocolatey</a>
    </step>

 <step>
        <p>Follow the steps in the link below to install Kubectl </p>
        <a href="https://kubernetes.io/docs/tasks/tools/install-kubectl-windows/#install-nonstandard-package-tools">Kubectl</a>
    </step>
  
</procedure>


## Installing Minikube

<procedure title="Installing Minikube" id="inject-a-procedure2">
    <step>
        <p>Installing Minikube </p>
        <a href="https://minikube.sigs.k8s.io/docs/start/?arch=%2Fwindows%2Fx86-64%2Fstable%2F.exe+download">Minikube</a>
    </step>
</procedure>

Now Test:
<p>minikube is local Kubernetes, focusing on making it easy to learn and develop for Kubernetes.
All you need is Docker (or similarly compatible) container or a Virtual Machine environment</p>
Run this On the Terminal:

<code>
minikube dashboard
</code>

The Output:


![k3.PNG](k3.PNG)