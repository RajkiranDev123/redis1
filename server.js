
const client=require("./client.js")
const axios=require("axios")
const express=require("express")

const app=express()

app.get("/",async (req,res)=>{
   try {
     const cachedValues=await client.get("todos")
     if(cachedValues){
         return res.json(JSON.parse(cachedValues))
     }
     const {data}=await axios.get("https://jsonplaceholder.typicode.com/todos")
     console.log("first",typeof data)
 
     await client.set("todos",JSON.stringify(data))
     await client.expire("todos",10)
 
     return res.json(data)
   } catch (error) {
    console.log(error)
    return res.status(500).json(error)
   }
})
app.listen(5000)