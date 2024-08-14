const express= require('express')
const app = express()
app.get("/", (req,res)=>{
    res.send(`     
        <h1> Hello Kubernetes </h1>
        <p> Some new Changes </p>
        <p> More Changes </p>
        
        `)
})
app.get('/error', (req,res)=>{
    process.exit(1)
})

app.listen(80, ()=>{
    console.log("App is Running...");
    
})