const express = require('express')
const app = express()
app.use(express.json())
const PORT = 9000
app.get('/',(req,res)=>{
    res.status(200).json({
        status:"Success",
        data:"Hello"
    })
})

app.listen(PORT,()=>{
    console.log('Listening')
})