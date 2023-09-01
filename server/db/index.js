const mongoose = require('mongoose');
const AdminSchema=new mongoose.Schema({
    username:"String",
    password:"String"
});
const UserSchema=new mongoose.Schema({
    username:"String",
    password:"String",
    purchasedCourses:[{type: mongoose.Types.ObjectId,ref:'Course'}]
})
const CourseSchema=new mongoose.Schema({
    title:String,
    description: String,
    price:Number,
    imageLink: String,
    published:Boolean

})


const Admin=mongoose.model('Admin',AdminSchema);
const Course=mongoose.model('Course',CourseSchema);
const User=mongoose.model('User',UserSchema);



module.exports={Admin,Course,User};
