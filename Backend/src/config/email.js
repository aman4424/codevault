const nodemailer=require("nodemailer");

const transporter = nodemailer.createTransport({

    host: process.env.EMAIL_SMTP_HOST || "sandbox.smtp.mailtrap.io",
    port: Number(process.env.EMAIL_SMTP_PORT) || 2525,
    auth:{
        user: process.env.EMAIL_SANDBOX_USER,
        pass: process.env.EMAIL_SANDBOX_PASS
    }
})

module.exports=transporter