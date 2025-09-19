require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT||3600;
const dbConnection = require('./config/db');
const router = require('./routes/indexRoute');
const cors = require('cors');


// db connection
dbConnection();

// allowing diff origin 

app.use(cors());

// using for req parsing

app.use(express.json());







app.use('/api',router);

app.use('/',(req,res)=>{
    res.send("Backend is live")
})


app.listen(PORT,()=>{
    console.log(`http://localhost:${PORT}`)
})



