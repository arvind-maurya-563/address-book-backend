const User = require('../models/User');
const OtpModel = require('../models/Otp')
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendEmail = require('../helper/sendmail');

exports.register = async (req, res) => {
  try {
    const {password, fullname, email } = req.body;
    const existinguser = await User.findOne({ where: { email } });
    if(existinguser){
      return res.status(400).json({ status: false, message: 'User allready present with email and password'});
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ email, fullname, password: hashedPassword });
    res.status(201).json({status: true, message: 'OTP Verified And Account Created Successfully'});
  } catch (error) {
    res.status(500).json({status: false, message: 'Error registering user',error });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ status: false, message: 'Invalid email or password' });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ status: false, message: 'Invalid username or password' });
    }
    const token = jwt.sign({ id: user.id, name: user.fullname }, process.env.JWT_SECRET);
    res.json({ status: true, message: 'Login successfully', token, name: user.fullname });
  } catch (error) {
    res.status(500).json({ status: false, message: 'Somthing went wrong.', error });
  }
};
const generateOtp = () => {
  return crypto.randomInt(100000, 999999).toString(); 
}

exports.sendOtp = async (req, res) => {
  const {fullname, email } = req.body;
  if (!email) {
      return res.status(400).json({ message: 'Email is required' });
  }
  const otp = generateOtp();
  try {
      const existinguser = await User.findOne({ where: { email } });
      if(existinguser){
        return res.status(400).json({ status: false, message: 'User allready present with this email'});
      }
      const record = await OtpModel.findOne({
        where: {
            email
        }
    });
    if (record) {
      await record.destroy();
    }
     const optResponse =  await sendEmail(otp, email,fullname);
     if(optResponse.status){
      await OtpModel.upsert({ email, otp });
      res.status(200).json({ status: true, message: 'OTP sent successfully' });
     }else{
      res.status(200).json({ status: false, message: 'Somthing went wrong while sending OTP. Please Try Again Later.' });
     }
  } catch (error) {
      res.status(500).json({status: false, message: 'Error sending OTP', error });
  }
}

exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
      return res.status(400).json({ message: 'Email and OTP are required' });
  }
  try {
      const record = await OtpModel.findOne({
          where: {
              email,
              otp
          }
      });
      if (record) {
        await record.destroy();
        await this.register(req,res);
    } else {
        res.status(400).json({ message: 'Invalid OTP' });
    }
  } catch (error) {
      res.status(500).json({ message: 'Error verifying OTP', error });
  }
}