import express, {json, Request, Response} from "express"
import fruitsRouter from "./Routes/fruitsRoutes"
import uploadRouter from "./Routes/uploadRoutes"
import cors from 'cors'

const app= express()

app.use(cors())
app.use(json())

app.use("/fruits", fruitsRouter)
app.use("/upload", uploadRouter )

app.use("/test", (req:Request,res:Response)=>{
    res.status(200).send('<h1> Hello There!! </h1>')
})
app.listen(80, ()=>{
    console.log("Server Running");
    
})