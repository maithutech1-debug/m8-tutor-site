// Simple Express server to accept form POST and send email via SMTP (nodemailer).
// Usage: set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS and RECIPIENT_EMAIL=tradergmailcom744@gmail.com
const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = process.env.SMTP_PORT || 587;
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const RECIPIENT = process.env.RECIPIENT_EMAIL || 'tradergmailcom744@gmail.com';

if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
  console.warn('SMTP credentials are not fully set. Please set SMTP_HOST, SMTP_USER, SMTP_PASS.');
}

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: SMTP_PORT == 465,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS
  }
});

// Endpoint used by the website form (set form action to /api/apply when using this server)
app.post('/api/apply', async (req, res) => {
  try {
    const { name, email, phone, reason, message } = req.body;
    const content = `
      Name: ${name || '-'}
      Email: ${email || '-'}
      Phone: ${phone || '-'}
      Reason: ${reason || '-'}
      Message:
      ${message || '-'}
    `;
    await transporter.sendMail({
      from: SMTP_USER,
      to: RECIPIENT,
      subject: `M8 Website Application: ${name || 'No name'}`,
      text: content,
      replyTo: email || SMTP_USER
    });
    res.json({ ok:true, message: 'Email sent' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok:false, error: 'Failed to send email' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>console.log(`Server listening on ${PORT}`));
