import { BadRequestException, compareHash, ConflictException, generateHash, NotFoundException } from "../../common/index.js"
import { sendEmail } from "../../common/middleware/sendEmail.js"
import { generateToken, generateNewAccessToken } from "../../common/services/token.service.js"
import { userModel } from "../../database/model/user.model.js"
import { get, set } from "../../database/redis/redis.service.js"

export const signup = async(body, file)=>{
    let {userName, email, password, confirmPassword, age, gender} = body
    let profileImage;
    if (password !== confirmPassword) {
        return BadRequestException({message: "password and confirm password don't match"})
    }
    if (file) {
        profileImage = file.path
    }
    let existedEmail = await userModel.findOne({email})
    if (existedEmail) {
        return ConflictException({message: "Email already exists"})
    }else{
        let hashedPassword = await generateHash({plainText: password})
        if (hashedPassword) {
            let otp = Math.round(Math.random() * 1000000)
            let addedUser = await userModel.create({userName, email, password: hashedPassword, age, gender, profileImage})
            set(`otp::${addedUser._id}`, otp, 180)
            console.log(`otp::${addedUser._id}`);
            
            sendEmail({to: email, subject: "test saraha app", html: `<h1> Your OTP is ${otp} </h1>`})
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
    if (!userData.isVerified) {
        return BadRequestException({message: "User not verified"})
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

export const verifyAccount = async(body)=>{
    let {otp, email} = body
    let userData = await userModel.findOne({email})
    if (!userData) {
        return NotFoundException({message: "user not found"})
    }

    if (userData.isVerified) {
        return BadRequestException({message: "user already verified"})
    }

    const redisOTP = await get(`otp::${userData._id}`)
    
    if (redisOTP != otp) {
        return BadRequestException({message: "otp does not match"})
    }

    userData.isVerified = true
    await userData.save()
    return userData
}


export const getAllUsers = async()=>{
    let usersData = await userModel.find()
    if (usersData.length > 0) {
        return {message: "All users", users: usersData}
    }else{
        return BadRequestException({message: "no users fouond"})
    }
}