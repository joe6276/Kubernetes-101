const sql = require('mssql')
const {sqlConfig} = require('../config/index')


const {v4} = require('uuid')
 const addBook = async(req,res)=>{
    try {
        var body = req.body;
        let pool= await sql.connect(sqlConfig)
        const id = v4();
               
        await pool.request()
        .input("Id", id)
        .input("Name", body.name)
        .input("Price", body.price)
        .execute('addBooks')
        res.status(201).json({message:"Book Added Successfully!!"})
        
    } catch (error) {
        res.status(500).json(error)
        
    }
}

 const getBooks = async(req,res)=>{
    try {
        let pool= await sql.connect(sqlConfig)
        let books = await (await pool.request().execute('getBooks')).recordset
        res.status(200).json(books)
        
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
        
    }
}

module.exports={
    addBook,
    getBooks
}