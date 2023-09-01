const SECRET="324SEcreT432";
const jwt=require("jsonwebtoken")




const authenticateJwt=(req,res,next)=>{
    const authHeader=req.headers.authorization;
    if(authHeader)
    {
        const token=authHeader.split(" ")[1];
        jwt.verify(token,SECRET,(err,user)=>{
            if(err)
            {
                return res.sendStatus(403);
            }
            else{
                req.user=user;
                next();

            }
        })


    }
    else{
        res.sendStatus(401);
    }




}






module.exports={SECRET,authenticateJwt};