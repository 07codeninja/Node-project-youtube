const userModel = require("../models/userModel")
const bcrypt = require('bcryptjs')
const JWT = require('jsonwebtoken')
const registerController =async(req,res)=>{
try {
    const{username,email,password,phone,address,answer}=req.body
    if(!username || !email|| !password || !address || !phone || !answer){
        return res.status(500).sent({
            sucess:false,
            message:'Please Provide All Fields'
        })
    }
    const exisiting =await userModel.findOne({email})
    if(exisiting){
        return res.status(500).send({
            success:false,
            message:'Email Already Registered please Login'
        })
    }
    //hashing password
    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password,salt)
    const user =await userModel.create({
        username,
        email,
        password: hashedPassword,
        address,
        phone,
        answer,
    });
    res.status(201).send({
        success: true,
        message: "Sucessfully Registered",
        user,
    });
} catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message:'Error In Register API',
        error,
    });
}
}
const loginController = async (req,res)=>{
    try {
        const{email,password} = req.body
        if(!email || !password){
            return res.status(500).send({
                success:false,
                message:'Please Provide Email OR Password'
            })
        }
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(404).send({
                success: false,
                message:'User Not Found'
            })
        }
        const isMatch = await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(500).send({
                success:false,
                message:'Invalid Credentials',
            });
        }
       const token = JWT.sign({id:user._id},process.env.JWT_SECRET,{
        expiresIn: "7d",
       }) 
        user.password = undefined;
        res.status(200).send({
            success:true,
            message:'Login Successfully',
            token,
            user
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error In Login API',
            error
        })
    }
}
module.exports ={ registerController,loginController };