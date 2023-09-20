const express = require('express')
const colors = require('colors')
const dotenv = require("dotenv").config()
const port = process.env.PORT || 5000
const errorHandler = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const cors = require('cors')

connectDB()
const app = express()

app.use(cors)
app.use(express.json())
app.use(express.urlencoded({extended : false}))
app.use(errorHandler)


app.use('/api/tareas', require('./routes/tareasRouters'))
app.use('/api/users', require('./routes/usersRoutes'))


app.listen(port, ()=>{
    console.log(`Server startert on port ${port}`)
})