import { model, Schema } from "mongoose";
import { GenderEnum, ProviderEnum, RoleEnum } from "../../common/index.js";




const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
        min: 3,
        max: 50
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        // required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    gender: {
        type: String,
        enum: GenderEnum,
        default: GenderEnum.Male
    },
    role: {
        type: String,
        enum: RoleEnum,
        default: RoleEnum.User
    },
    provider: {
        type: String,
        enum: ProviderEnum,
        default: ProviderEnum.System
    },
    profileImage: {
        type: String
    },
    coverImage: {
        type: [String]
    },
    isVerified: {
        type: Boolean,
        default: false
    }
},{
    timestamps: true
})


export const userModel = model("user", userSchema)