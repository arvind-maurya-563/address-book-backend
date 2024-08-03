const nodemailer = require('nodemailer');

const sendEmail = async (otp,emailId, name)=>{
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: true,
        port: 465,
        auth: {
          user: process.env.USER_EMAIL,
          pass: process.env.USER_PASSWORD
        }
      });
        const mailOptions = {
            from: 'arvindmaurya495858@gmail.com',
            to: emailId,
            subject: 'Address Book Registration OTP',
            text: `Dear ${name}, your OTP is ${otp}. Use this OTP to complete your Sign Up procedures.`
          };
       const mailresponse = await transporter.sendMail(mailOptions);
       if(mailresponse.accepted.length>0){
        return {status: true}
       }else{
        return {status: false}
       } 
    } catch (error) {
        console.log(error);
        return {status: false}
    }
}
module.exports = sendEmail;