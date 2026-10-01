import jwt from 'jsonwebtoken';
export const auth = (req, res, next)=>{
    let [flag, token] = req.headers.authorization.split(" ")
    switch (flag) {
        case "Basic":
            const basicData = Buffer.from(token, "base64").toString()
            let [eamil, password] = basicData.split(":")
            break;
    
        case "Bearer":
            let decoded = jwt.decode(token) 
            console.log(decoded);
             
        default:
            break;
    }
    
    // next()
}