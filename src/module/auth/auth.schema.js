import z from "zod" 

export const userLoginSchema = z.object({
        email: z.string().email(),
        password: z.string()
    })



export const userSignupSchema = z.object({
    userName: z.string().min(3).max(50),
    email: z.string().email(),
    password: z.string(),
    confirmPassword: z.string(),
    
})    