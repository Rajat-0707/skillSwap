import authMiddleware from "../middleware/authMiddleware.js"
import User from "../model/User.js"
import Messages from "../model/messages.js"

const express=require("express")

const app=express.Router()

app.get('/messages',async(req:any,authMiddleware:any,res:any)=>{
    try{    const messages:string[]=await Messages.find({recieverId:req.user.id})
    res.json(messages)
    }catch(err){
        console.log(err)
    }
}

)