const express = require('express')
const {  router } = require('./Routes')
const cors= require('cors')
const app= express()
app.use(cors())
app.use(express.json())

app.use('/books', router)


app.get('/error', ()=>{
    process.exit(1)
})

app.listen(8000, ()=>{
    console.log("Server is Running...");
    
})