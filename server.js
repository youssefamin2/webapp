const express=require('express')

const app=express();
let serverData={}
app.use(express.static('frontend'))
app.use(express.json())

app.listen(8080,()=>{
    console.log("server is running")
})
app.post('/savaData',(req,res)=>{
 serverData=req.body
res.json({msg:'done'})
})
app.get('/getData',(req,res)=>{
res.json(serverData)
})






