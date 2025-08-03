const { User } =require('../Models/User');
const express=require('express')
const bcrypt=require('bcrypt')
const joi=require('joi')
const genAuthToken =require('../utils/genAuthToken');
const router=express.Router(); //FOR MAKING END POINTS
router.post('/',async(req,res)=>{
    const schema=joi.object({
        name:joi.string().required().min(3).max(30),
        email:joi.string().required().min(3).max(200).email(),
        password:joi.string().min(3).max(200).required()
    })
    const {error}=schema.validate(req.body);
    if(error) return res.status(400).send(error.details[0].message)
       let user=await User.findOne({email:req.body.email});
    if(user)
        return res.status(400).send("User with email is already exist...");
    const newuser=new User({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    });
    const salt=await bcrypt.genSalt(10);
    newuser.password=await bcrypt.hash(newuser.password,salt)
    user=await newuser.save()
    const token=genAuthToken(user);
    res.send(token)

})
module.exports=router;