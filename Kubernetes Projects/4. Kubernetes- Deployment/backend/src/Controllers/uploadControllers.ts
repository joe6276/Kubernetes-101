
import {Request,Response} from 'express'
import AWS from 'aws-sdk'
import dotenv from 'dotenv'
import path from 'path'
import {v4 as uid } from 'uuid'
dotenv.config({path:path.join('../../.env')})


export const uploadImage=(req:Request, res:Response)=>{
    try {
        const keyName =`images/${uid()}.jpeg`
        const s3= new AWS.S3({
            region:'us-east-1',
            accessKeyId:process.env.ACCESS_KEY,
            secretAccessKey:process.env.SECRET_ACCESS
        })

        s3.getSignedUrl('putObject',{
            Bucket:process.env.BUCKET_NAME,
            Key:keyName,
            ContentType:'image/jpeg'
        }, (err, url)=> res.send({url, key: keyName}))
    } catch (error) {
        
    }
}