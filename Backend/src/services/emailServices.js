const transporter=require("../config/email")
const sendResetPasswordURL=async (url,email)=>{
    console.log(url)
    return transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: email,
        subject: "Reset your password",
        text: `Reset your password using this link: ${url}`
    });
}
module.exports={
    sendResetPasswordURL,
}