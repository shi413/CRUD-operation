const express = require('express')
const { userRouter } = require('./Router/userRoute')
require('./Dbconnection/mongoose')
const app = express()

let PORT = 2000

app.use(express.json())
app.use('/',userRouter)

app.listen(PORT,()=>{
    console.log(`Server is Running`);
})