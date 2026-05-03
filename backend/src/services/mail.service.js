import nodemailer from 'nodemailer';


console.log("User:", process.env.GOOGLE_USER);
console.log("Token:", process.env.GOOGLE_REFRESH_TOKEN ? "Found" : "Not Found");

//creat transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.GOOGLE_USER,
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
  },
});

// Verify the connection configuration
transporter.verify() 
.then(()=> {console.log('Email transporter is ready to send emails')})
.catch(err => {console.log("Email transporter verification is failed",err)});

//send email function
export async function sendEmail({to,subject,text,html}) {
    const mailOptions = {
         from: process.env.GOOGLE_USER,
        to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body

    };

    const details = await transporter.sendMail(mailOptions);
    console.log("Email sent:", details);
}