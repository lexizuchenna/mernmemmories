const express = require("express") ;
const dotenv = require('dotenv').config()
const cors = require('cors') 
const connectDB = require('./config/db')  

const app = express()

app.use(express.json({extended: true, limit: '30mb'}))
app.use(express.urlencoded({ extended: true }))
app.use(cors())

connectDB()

app.get('/', (req, res) => {
    res.send('API Working')
})
app.use('/posts', require('./routes/postsRoutes'))

app.listen(process.env.PORT, console.log(`App started on port: ${process.env.PORT}`))
