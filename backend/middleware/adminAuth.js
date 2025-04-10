import jwt from "jsonwebtoken"

const addAuth = async (req,res,next)=>{
    try {
        const {token} = req.headers
        if (!token) {
           return res.json({success:false,message:"Not Authorized Please Login Again"}) 
        }
        const token_decode = jwt.verify(token,process.env.JWT_SECRET)
        if (token_decode !== process.env.ADMIN_EMAIL+process.env.ADMIN_PASS ) {
            return res.json({success:false,message:"Not Authorized Please Login Again"})
        }
        next()

    } catch (error) {
       console.log(error);
       res.json({success:false,message:error.message})
        
    }
}

export default addAuth


