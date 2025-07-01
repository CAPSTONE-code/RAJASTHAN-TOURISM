require('dotenv').config()
const express=require('express');
const app=express();
const dbData=require('./mongodbData');
const { data } = require('autoprefixer');



app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Allow all origins
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});



app.get('/api/hospitals', (request, response) => {
  dbData.getdata('hospitals',{}).then(res=>response.json(res)).catch(err=>response.send(err))
});


app.get('/api/tourist-guides', (request, response) => {
  let cityName=request.query.city.charAt(0).toUpperCase() + request.query.city.slice(1).toString()
  if(cityName==="All"){
    dbData.getdata('guides').then(res=>response.json(res)).catch(err=>response.send(err))
  }
  else{
    dbData.getdata('guides',{City:cityName}).then(res=>response.json(res)).catch(err=>response.send(err))
  }
});

app.get('/api/community',(request,response)=>{
    dbData.randomData("community").then(res=>response.json(res)).catch(err=>response.send(err))
  })
app.post('./api/community/comment',(request,response)=>{
  data=request.body
  console.log(data)
})


const port = process.env.SERVER_PORT 
app.listen(port, () => {
    console.log("server is running")
})