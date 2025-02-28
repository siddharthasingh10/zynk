import jwt from "jsonwebtoken";
export const userAuth=async (req,res,next)=>{
    try{
        const token=res.cookies.token;
        if(!token){
            return res.status(401).json({message:"Unauthorized",
                success:false
            });
        }
        const decode= await jwt.verify(token,process.env.JWT_SECRET);
        if(!decode){
            return res.status(401).json({message:"Unauthorized",
                success:false
            });
        }
       req.id=decode.userId;

        next();
    }catch(error){
        console.log(error);
        return res.status(500).json({message: "Internal Server Error"});
    }
}