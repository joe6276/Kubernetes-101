import { Response,Request } from "express";
import {v4 as uid} from 'uuid'
import mssql from 'mssql'
import { sqlConfig } from "../Config";

export const addFruits = async (req:Request, res:Response)=>{
    try {
        
        let pool = await mssql.connect(sqlConfig)
        let { Name, ImageUrl} =req.body
        await pool.request()
        .input('Id', uid())
        .input('Name', Name)
        .input('ImageUrl', ImageUrl)
        .execute('addFruit')
        res.status(201).json({message:'Added Fruit'})
    } catch (error) {
        res.status(500).json(error)
    }
}

export const getFruits = async (req:Request, res:Response)=>{
    try {
        
        let pool = await mssql.connect(sqlConfig)
        let fruits=await (await pool.request().execute('getFruits')).recordset
        console.log(fruits);
        
        res.status(201).json(fruits)
    } catch (error) {
        res.status(500).json(error)
    }
}