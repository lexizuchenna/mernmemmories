const express = require("express") ;
const cors = require('cors') 
const connectDB = require('./config/db')  

const app = express()

app.use(express.json({extended: true, limit: '30mb'}))
app.use(express.urlencoded({ extended: true }))
app.use(cors())

connectDB()

app.use('/posts', require('./routes/postsRoutes'))

app.listen(4000, console.log('app started'))
