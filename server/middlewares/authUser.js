import jwt from "jsonwebtoken"

const authUser = (req, res, next) => {
    
    try {
        const token = req.headers.authorization.split(" ")[1]

        const isCustomAuth = token.length < 500
        let decodedData 

        if(token && isCustomAuth){
          let SECRET = process.env.USER
          decodedData = jwt.verify(token, SECRET) 
          req.email = decodedData?.email    
          req.userId = decodedData?.id
        }
        else{
          decodedData = jwt.decode(token)  
          req.email = decodedData?.email  
          req.userId = decodedData?.sub
        }

        next()
    } catch (error) {
        console.log(error)
    }
    
}


export default authUser