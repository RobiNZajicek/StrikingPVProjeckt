const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const admin = require('firebase-admin');
const path = require('path');
const fs = require('fs');

admin.initializeApp();

// Nastavení e-mailového klienta (Gmail)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'zajicekrobin3@gmail.com', // Nahraďte svým e-mailem
    pass: 'Rob1n123456789CZ.js#jsx', // Nahraďte svým heslem
  },
});

exports.sendWelcomeEmail = functions.firestore
  .document('users/{userId}')
  .onCreate(async (snapshot, context) => {
    const user = snapshot.data();

    // Cesty k .txt souborům (lokální cesty v rámci Firebase Functions)
    const filePaths = [
      path.join(__dirname, 'Texty-do-těla-emailu.txt'),
      path.join(__dirname, 'Všeobecné-obchodní-podmínky.txt'),
      path.join(__dirname, 'Zpracování-Osobních-Údajů.txt'),
    ];

    // Připrav přílohy
    const attachments = filePaths.map((filePath) => {
      return {
        filename: path.basename(filePath), // Název souboru
        content: fs.readFileSync(filePath), // Obsah souboru
      };
    });

    // Nastavení e-mailu
    const mailOptions = {
      from: 'zajicekrobin3@gmail.com',
      to: user.email,
      subject: 'Vítejte ve Striking Academy!',
      text: `Ahoj ${user.name},\n\nDěkujeme za registraci na první trénink zdarma!\n\nV příloze najdete důležité dokumenty.`,
      attachments: attachments,
    };

    try {
      // Odeslání e-mailu
      await transporter.sendMail(mailOptions);
      // console.log('E-mail odeslán uživateli:', user.email);
    } catch (error) {
      console.error('Chyba při odesílání e-mailu:', error);
    }
  });