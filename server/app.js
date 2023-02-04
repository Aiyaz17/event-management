const express = require('express')
const app = express()
app.use(express.json())
const PORT = 9000
const db_conn = require('./db_conn')()
const eventRouter = require('./routers/eventRouter')
const userRouter = require('./routers/userRouter')
app.use('/api',eventRouter)


app.get('/',(req,res)=>{
    res.status(200).json({
        status:"Success",
        data:"Hello"
    })
})

app.listen(PORT,()=>{
    console.log('Listening')
})