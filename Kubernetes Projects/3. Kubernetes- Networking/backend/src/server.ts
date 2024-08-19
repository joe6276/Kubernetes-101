import express,{json,Request,Response} from 'express'
import cors from 'cors'
import mssql from 'mssql'
import { sqlConfig } from './Config'
import {v4 as uid} from 'uuid'
const app= express()

app.use(json())
app.use(cors())

app.post("/fruits",async (req:Request,res:Response)=>{
   try{
    let pool = await mssql.connect(sqlConfig)
    let { Name, ImageUrl} =req.body
    await pool.request()
    .input('Id', uid())
    .input('Name', Name)
    .input('ImageUrl', ImageUrl)
    .execute('addFruit')
    res.status(201).json({message:'Added Fruit'})
   }catch(error){
    res.status(500).json(error)
   }
})


app.get("/fruits", async(req:Request,res:Response)=>{
    try{

        let pool = await mssql.connect(sqlConfig)
        let fruits=await (await pool.request().execute('getFruits')).recordset
        res.status(200).json(fruits)

    }catch(error){

    }
})

//Just a test URL
app.use("/test", (req:Request,res:Response)=>{
    res.status(200).send('<h1> Hello There!! </h1>')
})

app.listen(4000, ()=>{
    console.log("Server Running");
})