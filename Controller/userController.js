const validator = require('validator');
const { userModel } = require('../Model/userModel');
const jwt = require('jsonwebtoken');
const { hassPass, comparePassword } = require('../bcrypt');


const Registration = async(req,res)=>{
    let {email} = req.body;
    try {
    if(!validator.isEmail(email)){return res.status(400).send({success:false,message:'Email Validation Failed'})}
    let user = await userModel.findOne({email:req.body.email})
    if(user){return res.status(409).send({success:false,message:'User Already Register'})}
    let hassPassword = await hassPass(req.body.password)
    let newuser = await userModel.create({...req.body,password:hassPassword})
    res.status(201).send({success:true,message:'Registered Successfully',data:newuser})
    } catch (error) {
    res.status(500).send({ success: false, message: 'Server Crashed', error: error.message });
    } 
}

const Login = async(req,res)=>{
    let {email,password} =req.body;
    try {
    let user = await userModel.findOne({email:email})
    if(!user){return res.status(404).send({success:false,message:'User Not Register'})}
    const matchedpassword = await comparePassword(password,user.password)
    if(!matchedpassword){return res.status(409).send({success:false,message:'Wrong Password'})}
    var token = jwt.sign({user:user},"shivam",{expiresIn:"30M"})
    res.setHeader("token",token)
    res.status(200).send({success:true,message:'Login Successfully',data:user,token:token})
    } catch (error) {
    res.status(500).send({ success: false, message: 'Server Crashed'});
    }
}

const Alluser = async(req,res)=>{
    try {
    let alluser = await userModel.find()
    if(alluser.length==0){return res.status(404).send({success:false,message:'No User Found'})}
    res.status(200).send({success:true,message:'All Users',Total_User:alluser.length,data:alluser})
    } catch (error) {
    res.status(500).send({ success: false, message: 'Server Crashed'});
    }   
}

const userUpdate = async(req,res)=>{
    try {
    let user = await userModel.findOne({_id:req.params.id})
    if(!user){return res.status(409).send({success:false,message:'User Does not exist'})}
    let updateuser = await userModel.findByIdAndUpdate(req.params.id,req.body,{new:true})
    res.status(200).send({success:true,message:'User Updated',data:updateuser})
    } catch (error) {
    res.status(500).send({ success: false, message: 'Server Crashed'});
    }
  }

  const userDelete = async(req,res)=>{
    try {
    let user = await userModel.findById(req.params.id)
    if(!user){return res.status(409).send({success:false,message:'User Does not exist'})}
    await userModel.findByIdAndDelete(req.params.id);
    res.status(200).send({success:true,message:'User Deleted'})
    } catch (error) {
    res.status(500).send({ success: false, message: 'Server Crashed', error: error.message });
    }
}

module.exports = {Registration,Login,Alluser,userUpdate,userDelete}
