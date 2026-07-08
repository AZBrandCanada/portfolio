import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, phone, message } = req.body;

  // Validate required inputs
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'Please fill in all required fields.' });
  }

  // Create standard nodemailer transporter using Gmail SMTP
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,         // Your dispatch Gmail address
      pass: process.env.GMAIL_APP_PASSWORD, // 16-character App Password (NOT your normal Gmail password)
    },
  });

  try {
    // Send email notification to your ProtonMail inbox
    await transporter.sendMail({
      from: `"${name}" <${process.env.GMAIL_USER}>`, // Google requires the sender to match GMAIL_USER
      to: 'HandyHeroYYC@proton.me',                // Destination inbox
      replyTo: email,                               // Allows direct replies back to the prospect
      subject: `🚨 New Lead: ${name} (HandyHeroYYC)`,
      text: `
        Name: ${name}
        Email: ${email}
        Phone: ${phone || 'Not provided'}
        Message: ${message}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 25px; border: 1px solid #1e293b; border-radius: 12px; max-width: 600px; background-color: #0f172a; color: #f8fafc;">
          <h2 style="color: #f59e0b; border-bottom: 2px solid #334155; padding-bottom: 12px; margin-top: 0; font-size: 20px; font-weight: 900;">New HandyHeroYYC Lead</h2>
          <p style="margin: 10px 0;"><strong style="color: #94a3b8;">Client Name:</strong> ${name}</p>
          <p style="margin: 10px 0;"><strong style="color: #94a3b8;">Email:</strong> <a href="mailto:${email}" style="color: #38bdf8; text-decoration: none;">${email}</a></p>
          <p style="margin: 10px 0;"><strong style="color: #94a3b8;">Phone Number:</strong> ${phone ? `<a href="tel:${phone}" style="color: #38bdf8; text-decoration: none;">${phone}</a>` : 'Not provided'}</p>
          
          <div style="background-color: #1e293b; padding: 15px; border-radius: 8px; margin-top: 20px; border-left: 4px solid #f59e0b;">
            <p style="margin: 0; font-weight: bold; color: #f59e0b; margin-bottom: 8px;">Project Details:</p>
            <p style="margin: 0; white-space: pre-wrap; line-height: 1.6; color: #cbd5e1;">${message}</p>
          </div>
        </div>
      `,
    });

    return res.status(200).json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('SMTP Error:', error);
    return res.status(500).json({ message: 'SMTP routing failed. Please verify configurations.', error: error.message });
  }
}