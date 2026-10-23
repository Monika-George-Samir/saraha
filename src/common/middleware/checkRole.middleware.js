import { userModel } from "../../database/model/user.model.js"
import { UnAuthorizedException } from "../exceptions/error.exception.js"


export const checkRole = (roles)=>{
    return async(req, res, next)=>{
        let userData = await userModel.findById(req.user.id)

        if (!userData.role.includes(roles)) {
            return UnAuthorizedException({message: "You are not authorized to perform this action"})
        }  

        // if (!roles.includes(req.user.aud)) {
        //     return UnAuthorizedException({message: "not authorized"})
        // }
        
        next()
        
    }
}