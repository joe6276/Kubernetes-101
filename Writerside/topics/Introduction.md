# Introduction to Kubernetes

## What is the Problem 
Manual deployment of containers is hard to maintain , error-prone and annoying. Below are some of the challenges one might face:


<list type="bullet">
    <li> Containers might crash/ go down and need to be replaced </li>
    <li> We might need more container instances upon traffic spikes</li>
    <li> Incoming traffic should be distributed equally </li>
</list>


## But an ECS seems to Solve the above issue

Yes, and Elastic Container Service(ECS) can solve the above issue but it locks us in, This might not sound as a major problem if you are using AWS but when you want to switch to another cloud provider its an issue because
you will have to learn about the specifics, services and config options of the other cloud provider 


<tip>
 <format style="bold" color="#00FF00">Kubernetes to the Rescue!</format>
</tip>


## What is Kubernetes 
Kubernetes, also known as K8s, is an open source system for automating deployment, scaling, and management of containerized applications
<br/>

Imagine having a bunch of servers, and you want to run your applications on them without worrying about where exactly they run or how they 
recover if something goes wrong. Kubernetes takes care of that for you, making sure your applications are always running smoothly.

![k1.jpg](k1.jpg)

## What Kubernetes is not
<warning>
   <list>
   <li>
    It's not a cloud service provider
   </li>
   <li>
Its not a service by a cloud service provider
   </li>
  <li>
It's not restricted to any specific (cloud) Service provider.
   </li>  <li>
 Its not just a software you run on some machine
   </li>  <li>
 its not an alternative to Docker
   </li><li>
 its not a paid service
   </li>


   </list>

</warning>

Rather it's:

<note>
   <list>
   <li>
    It is an open source project
   </li>
   <li>
    It can be used with any provider
   </li>
  <li>
Its a collection of concepts and tools
   </li>  <li>
It works with (docker) containers
   </li>  <li>
 Its is a free open-source project
   </li><li>
 its not a paid service
   </li>


   </list>

</note>

<tip>
   Kubernetes is like Docker-Compose for Multiple Machines
</tip>

