const express = require("express");
const cors = require("cors")
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();
const morgan = require("morgan")
const ubiRoutes = require("./Routes/ubi");
const { response } = require("express");


const app = express();


app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(morgan("dev"))
app.use(cors())

const port = process.env.PORT || 3000;

app.use('/api', ubiRoutes) 

mongoose
.connect(process.env.MONGODB_URI)
.then(()=> console.log("Base de datos conectada"))
.catch((error)=> console.error(error));


app.listen(port, ()=> {console.log("Server funcionando correctamente")})

 

// fetch(" ../api", {
//     method: "POST",
//     body: data,
//     headers: 
// }).then(function(res){
//     if(response.ok){
//         return response.text()
//     } else {
//         throw "error"
//     }
// })