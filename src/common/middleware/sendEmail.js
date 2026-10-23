import nodemailer from "nodemailer";
import { env } from "../../config/env.service.js";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: env.emailUser,
        pass: env.appPassword
    }
});


export const sendEmail = ({to, subject, html})=>{
    transporter.sendMail({
        from: "saraha@gmail.com",
        to,
        subject,
        html
    })

    console.log("email sent");
}

