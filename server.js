require('dotenv').config() //Storing sensitive info in .env
const express = require('express')
const app = express()
const bodyParser = require("body-parser")

const mongoose = require('mongoose')

const jwt = require("jsonwebtoken")

const mainRoutes = require("./routes")

mongoose.connect(process.env.MONGODB_URI, { //connect to mongodb
    useNewUrlParser: true,
    useUnifiedTopology: true
},
    (err) => {
        if (err != null) {
            console.log("Failed to connect to mongodb", err);
        } else {
            console.log("Successfully connected to Mongodb");
        }
    });
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.json())//Identifies incoming request in JSON format
app.use(mainRoutes)//Use for routing

app.listen(process.env.PORT, () => { //ensures that server listens on the specified port
    console.log("Server started on port :", process.env.PORT);
})


