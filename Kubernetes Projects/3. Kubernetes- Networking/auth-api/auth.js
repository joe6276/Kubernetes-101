const express = require('express')

const app= express()
app.use(express.json())



app.get('/hash/:password', (req,res)=>{
    const enteredPassword= req.params.password
    const hashedPassword= enteredPassword +"dummy_password"
    res.status(200).json({hashedPassword})
})


app.listen(80)