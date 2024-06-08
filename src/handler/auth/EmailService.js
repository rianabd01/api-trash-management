const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_SERVICE,
    pass: process.env.EMAIL_SERVICE_PASSWORD,
  },
});

const sendOTP = (email, otp) => {
  const mailOptions = {
    from: process.env.EMAIL_SERVICE,
    to: email,
    subject: 'Sure App OTP Code',
    text: `Halo,\n\nKami telah menerima permintaan Anda untuk membuat akun di Sure App. Silakan gunakan kode berikut untuk verifikasi:\n\nKode OTP: ${otp}\n\nHarap ingat bahwa kode ini hanya berlaku untuk beberapa menit. Jangan berikan kode ini kepada siapapun, termasuk tim kami.\n\nTerima kasih telah menggunakan layanan kami.\n\nSalam,\nTim Sure App`,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = sendOTP;
