

const jwt = require("jsonwebtoken");



const authenticate = async(req,res,next)=>{

    const authToken=req.headers.authorization

    if(!authToken || !authToken.startsWith("Bearer ")){
return res.status(401).json({success:false, message:"No token ,authorization failed"})
    }

try {
    const token=authToken.split(" ")[1]

    const decoded=jwt.verify(token,process.env.NormalToken)
    

    req.userId=decoded.id

    // req.role=decoded.role


    next()
} catch (error) {
    if(error.name==="TokenExpiredError"){
       return res.status(401).json({message:"Token is expired"})
    }

    return res.status(401).json({success:false,message:"Invalid token"})
}





}




module.exports={authenticate}




