const express=require("express");
const app=express();
const router = express.Router();
const {Admin,Course,User}=require("../db/index.js");
const jwt=require('jsonwebtoken');
const {SECRET,authenticateJwt}=require("../middlewares/auth.js")


app.use(express.json());

router.post("/signup",async(req,res)=>{
    
    const {username,password}=req.body;

    const user=await Admin.findOne({username: username}).exec();
    if(user)
    {
        res.status(403).json({message:"Admin already exists"})
    }
    else{


    const newAdmin=new Admin({username:username,password: password});



    await newAdmin.save();

    const token =jwt.sign({username: username,role:'admin'},SECRET,{expiresIn:"1h"})
    res.json({message:"Admin created successfully",token});



}

})


router.post("/login",async(req,res)=>{
    const {username,password}=req.headers;
    const user=await Admin.findOne({username: username,password: password}).exec();
    if(user)
    {
        const token =jwt.sign({username: username,role:'admin'},SECRET,{expiresIn:"1h"})
        res.json({message:"Admin logged successfully",token});
    }
    else{
        res.status(403).json({message:"Admin creds incorrect"})
    }
})


router.get("/me",authenticateJwt,async(req,res)=>{
    const username=req.user.username;
    const user=await Admin.findOne({username: username}).exec();
    if(!user)
    {
        res.status(403).json({msg: "Admin doesnt exist"})

    }
    else
    {
        res.json({username: user.username})

    }

})

router.post("/courses",authenticateJwt,async(req,res)=>{

    const course=new Course(req.body);
   await course.save();

   res.json({message:"Course saved successfully",courseId: course.id});

})
router.get("/courses",authenticateJwt,async(req,res)=>{
    const courses= await Course.find({});
    res.json({courses});
})
router.get("/courses/:courseId",authenticateJwt,async(req,res)=>{
    const course= await Course.find({_id:req.params.courseId});
    res.json({course});
})
router.put("/courses/:courseId",authenticateJwt,async(req,res)=>{
    const newCourse=req.body;
    const course= await Course.findByIdAndUpdate(req.params.courseId,newCourse)
    res.json({message:"course updates successfully"});
})

module.exports=router