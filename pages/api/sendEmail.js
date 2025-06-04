import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, email, message } = req.body;

    // console.log('Received form data:', { name, email, message }); // Log form data

    // Create a transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'prague.striking.academy@gmail.com', // Use narawebs@gmail.com as the sender
        pass: process.env.EMAIL_PASS, // App password for narawebs@gmail.com
      },
    });

    // Define email options
    const mailOptions = {
      from: process.env.EMAIL_USER, // Sender email
      to: 'prague.striking.academy@gmail.com', // Recipient email
      subject: `New Message from ${name}`, // Email subject
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`, // Email body
    };

    try {
      // Send the email
      await transporter.sendMail(mailOptions);
      // console.log('Email sent successfully'); // Log success
      res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
      console.error('Error sending email:', error); // Log error
      res.status(500).json({ message: 'Error sending email', error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}