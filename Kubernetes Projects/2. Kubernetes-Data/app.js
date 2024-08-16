const path= require('path')
const fs= require('fs')
const express= require('express')

const app = express()

app.use(express.json())

const filePath = path.join(__dirname, process.env.FOLDER_NAME, 'text.txt')


app.get('/student', (req,res)=>{
    fs.readFile(filePath, (err,data)=>{
        if(err){
            return res.status(500).json({message:' Failed to open file.'})
        }
        res.status(200).json({student: data.toString()})
    })
})

app.post('/student', (req,res)=>{
    const newText= req.body.text;
    if(newText.trim().length ===0){
        res.status(422).json({message:'Student name must not be Empty'})
    }
    fs.appendFile(filePath, newText+ '\n', (err)=>{
        if(err){
            return res.status(500).json({message:'Failed to store text'})
        }
        res.status(200).json({message:' Student stored!!'})
    })
})

app.get('/error', (req,res)=>{
    process.exit(1)
})

app.listen(80)
