var nodemailer = require("nodemailer");
const dotenv = require('dotenv');

dotenv.config();

export const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: "soporte.erpan@gmail.com", // generated ethereal user
        pass: process.env.KEY_GMAIL, // generated ethereal password
    },
});

transporter.verify().then(() => {
    console.log("Listo para mandar emails");
}).catch((error: Error) => {
    console.error("Error al verificar el transporte:", error);
});