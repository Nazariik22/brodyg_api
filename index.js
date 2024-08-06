import express from 'express'
import router from './Router.js'
import sqlite3 from 'sqlite3';
const PORT = 3000
const app = express()

app.use(express.json())
app.use(express.static( 'static')) 


app.use('/api',router)

app.post('/',(req,res)=>{
    console.log('Все ок')
    res.status(200).json({message:"Все ок"})
})

//app.listen(port, host?, backlog?, callback)
app.listen(PORT,()=>{
    console.log('http://localhost:'+PORT)
})