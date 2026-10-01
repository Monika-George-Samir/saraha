import { BadRequestException, compareHash, ConflictException, generateHash, NotFoundException } from "../../common/index.js"
import { generateToken, generateNewAccessToken } from "../../common/services/token.service.js"
import { userModel } from "../../database/model/user.model.js"
import jwt from "jsonwebtoken"

export const signup = async(body)=>{
    let {userName, email, password, confirmPassword, age, gender} = body
    if (password !== confirmPassword) {
        return BadRequestException({message: "password and confirm password don't match"})
    }
    let existedEmail = await userModel.findOne({email})
    if (existedEmail) {
        return ConflictException({message: "Email already exists"})
    }else{
        let hashedPassword = await generateHash({plainText: password})
        if (hashedPassword) {
            let addedUser = await userModel.create({userName, email, password: hashedPassword, age, gender})
            return {message: "added", user: addedUser}
        }
    }
}


export const login = async(body)=>{
    let {email, password} = body
    let userData = await userModel.findOne({email})
    if(!userData){
        return NotFoundException({message: "user not found"})
    }
    let isMatched = await compareHash({plainText: password, hashedText: userData.password})
    
    if(isMatched){
        let {accessToken, refreshToken} = generateToken(userData)        
        return {message: "login successfully", accessToken, refreshToken}
    }else{
        return BadRequestException({message: "incorrect password"})
    }
}


export const getUserByID = async(id)=>{
    let userData = await userModel.findById(id)
    return userData
}


export const generateAccessToken = (body)=>{
    let {refreshToken} = body
    let {accessToken} = generateNewAccessToken(refreshToken)
    if (accessToken) {
        return {accessToken}
    }else{
        throw BadRequestException({message: "invalid token"})
    }
}