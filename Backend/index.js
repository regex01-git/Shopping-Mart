const express=require('express');
const products=require('./products')
const cors=require('cors')
const register=require('./routes/register')
const mongoose=require('mongoose')
const login=require('./routes/login')
const stripe=require('./routes/stripe')
const productRouter=require('./routes/products')
require("dotenv").config()  // BECAUSE OF THIS YOU CONNECT THIS FILE TO .env FILE AND ACCESS .env File variables
const port=process.env.PORT||5000

const app=express();
app.use(express.json({limit:'50mb'}));



app.use(cors({
  origin:'https://raos-industry.onrender.com',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  // allowedHeaders: ['Content-Type', 'Authorization']
  allowedHeaders: ["Content-Type", "x-auth-token","Authorization"] 
}))   //app.use() :- IT IS A MIDDLEWARE

app.get("/",(req,res)=>{
    res.send("welcome to our online shop API....grgrg");
})
app.get("/products",(req,res)=>{
    res.send(products);
})


const uri=process.env.DB_URI   //ACCESSING .ENV FILE VARIABLES

 mongoose.connect(uri)
  .then(() => {
    console.log("Mongoose connected...");
    app.use("/api/register", register);
    app.use('/api/login',login);
    app.use('/api/stripe',stripe);
    app.use('/api/products',productRouter);
    app.listen(port, () => {
      console.log("Server running on port 5000");
    });
  })
  .catch(err => {
    console.error("Failed to connect to MongoDB", err);
  });

