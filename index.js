const express = require('express');
const app = express();
const port = process.env.PORT || 3200; // Port 3000 use kiya gaya hai, aap koi aur port bhi use kar sakte hain.
const cors = require('cors'); // Import the cors package

// const nodemailer = require('nodemailer');
// const sgMail = require('@sendgrid/mail');
app.use(express.json());
// sgMail.setApiKey('YOUR_SENDGRID_API_KEY'); // Use your SendGrid API key here
app.use(cors()); // Use cors middleware

// app.post('/submit-form', (req, res) => {
//   const formData = req.body;
//     console.log(formData)

//     //   const msg = {
// //     to: 'receiverEmail@example.com', // Your receiver email
// //     from: 'noreply@yourdomain.com', // Your domain or any email that's not your personal email
// //     subject: 'New Form Submission',
// //     text: `Name: ${formData.name}, Email: ${formData.email}, Message: ${formData.message}`
// //   };

// //   sgMail.send(msg)
// //     .then(() => {
// //       res.send('Form submitted successfully!');
// //     })
//     .catch((error) => {
//       console.error(error);
//       res.send('Error occurred while sending email.');
//     });
// });


app.post('/submit-form', async (req, res) => {
    try {
        // const {email, message, agreeToPolicy} = req.body;
        // console.log("Here is form data", email , message, agreeToPolicy)
console.log(req.body)
        
  
      res.status(200).json({ message: 'Form submitted successfully!' });
    } catch (error) {
      console.error('Error occurred:', error);
      res.status(500).json({ error: 'Error occurred while processing form.' });
    }
  });
  
app.get('/', (req, res) => {
    res.send('Server is running!'); // Aap yaha par apna message bhi bhej sakte hain.
  });
  


  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
  