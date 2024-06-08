const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'suretrashfinderapp@gmail.com',
    pass: 'mqya xedv uenq moed',
  },
});

const sendOTP = (email, otp) => {
  const mailOptions = {
    from: 'suretrashfinderapp@gmail.com',
    to: email,
    subject: 'Sure App OTP Code',
    text: `Halo,\n\nKami telah menerima permintaan Anda untuk membuat akun di Sure App. Silakan gunakan kode berikut untuk verifikasi:\n\nKode OTP: ${otp}\n\nHarap ingat bahwa kode ini hanya berlaku untuk beberapa menit. Jangan berikan kode ini kepada siapapun, termasuk tim kami.\n\nTerima kasih telah menggunakan layanan kami.\n\nSalam,\nTim Sure App`,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = sendOTP;
