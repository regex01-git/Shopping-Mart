const jwt=require("jsonwebtoken");
const auth=(req,res,next)=>{
    const token=req.header("x-auth-token");
    if(!token) return res.status(401).send('Access denied first need to log in');
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY);
        req.user=decoded;
        console.log("decode",decoded)
        next();
    }catch(err){
        res.status(401).send('Invalid token');
    }
}
const isAdmin=(req,res,next)=>{
    auth(req,res,()=>{
        if(req.user.isAdmin===true){
            next();
        }else{
            return res.status(403).send('Access denied, you are not an admin');
        }
    })
}
module.exports=isAdmin;
