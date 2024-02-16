const express = require("express");
const app = express();
const port = process.env.PORT || 3200; // Port 3000 use kiya gaya hai, aap koi aur port bhi use kar sakte hain.
const cors = require("cors"); // Import the cors package

const nodemailer = require("nodemailer");
app.use(express.json());
app.use(cors()); // Use cors middleware

app.post("/submit-form", async (req, res) => {
  try {
    console.log(req.body);
    // Extract email from the request body
    const { email } = req.body;

    // Your nodemailer configuration
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "asmatechdevelopers@gmail.com", // Replace with your Gmail address
        pass: "fnfu ryvf pjsj tojl", // Replace with your Gmail password or use an app password
      },
    });

    // Email options
    const mailOptions = {
      from: "asmatechdevelopers@gmail.com", // Replace with your Gmail address
      to: "saadshaikh0316@gmail.com", // Replace with your support team's email address
      subject: "New Subscription",
      text: `New email subscription: ${email}`,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent:", info);

    res.status(200).json({ message: "Form submitted successfully!" });
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({ error: "Error occurred while processing form." });
  }
});
// app.post('/submit-form', async (req, res) => {
//     try {
// console.log(req.body)

//       res.status(200).json({ message: 'Form submitted successfully!' });
//     } catch (error) {
//       console.error('Error occurred:', error);
//       res.status(500).json({ error: 'Error occurred while processing form.' });
//     }
//   });

const fetchFilteredDataFromRealtorAPI = async (filters) => {
  const apiUrl = "https://ddfapi.realtor.ca/odata/v1/Property";
  const { '$filter': filter } = filters;

  try {

      // Create URL-encoded form data for the token request
      const formData = new URLSearchParams();
      formData.append("client_id", "6kLhX0JJDcRfKPnqWBP2ngva");
      formData.append("client_secret", "AEbLWbYj1AFh6SgRSh4RoJUw");
      formData.append("grant_type", "client_credentials");
      formData.append("scope", "DDFApi_Read");
  
      // Obtain a new access token by making a POST request to your token endpoint
      const tokenResponse = await fetch("https://identity.crea.ca/connect/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData,
      });

    if (!tokenResponse.ok) {
      throw new Error(`Failed to obtain access token! Status: ${tokenResponse.status}`);
    }

    const tokenData = await tokenResponse.json();







    const response = await fetch(`${apiUrl}?${filter}`, {
      method: "GET",
      headers: {
        Authorization:
          `Bearer ${tokenData.access_token}`, 
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log('fetched data')
    return data;
  } catch (error) {
    console.error("Error:", error);
    return { error: "Failed to fetch filtered data from Realtor.ca API" };
  }
};

app.get("/get-data", async (req, res) => {
  try {
    // Extract filters from query parameters
    const filters = req.query;

    // Fetch data with filters
    const data = await fetchFilteredDataFromRealtorAPI(filters);

    // Send the filtered data to the client
    res.json(data);
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "Failed to fetch filtered data from Realtor.ca API" });
  }
});

// async function fetchDataFromRealtorAPI() {
//   const apiUrl = 'https://ddfapi.realtor.ca/odata/v1/Property';
//   const url = `${apiUrl}`;

//   try {
//     const response = await fetch(url, {
//       method: 'GET',
//       headers: {
//         'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjZDRDJCOUVCRjFFRjUxODA5RTc3OTBBRTdFMTZGOUUzIiwidHlwIjoiYXQrand0In0.eyJpc3MiOiJodHRwczovL2lkZW50aXR5LmNyZWEuY2EiLCJuYmYiOjE3MDgwNDczMzcsImlhdCI6MTcwODA0NzMzNywiZXhwIjoxNzA4MDUwOTM3LCJhdWQiOiJEREZBcGkiLCJzY29wZSI6WyJEREZBcGlfUmVhZCJdLCJjbGllbnRfaWQiOiI2a0xoWDBKSkRjUmZLUG5xV0JQMm5ndmEiLCJkZXN0aW5hdGlvbmlkIjoiNTcwODEiLCJjbGllbnRuYW1lIjoiTkFTSVIgQSBKQU5BTkdFTCJ9.MUZjUM518nfyDUxF3jwG0lgSPJRlVYnZtwG_xjWGLfdjyfsTsME8eo6ABIBwNyYVQGXmSKKO9n1_NQn_LsiOimH4o2NfrkFXqh9f70uQO17FEol0QhmsomlafHTQSss97MEDtoH7cDgSDN5YQymnfuBQQgvmYjK3jJU-qfAQkGQWFuyzA-M-xg_8q2OEPJ8m96sePGIGQfsrI0PIoKNPsD8v41gaiTLpxs7KhoJsAcqwnq-hgts5YjEZ7V8wSqa4O8GGiZdL0aPw5gQZFgxy1CRciKHpPVAzh-24qvyGbRpRvpYBbor8-znTuqR5wNNYywIF5kzZTvRtaLSDeuLVFw', // Replace with your actual access token
//       },
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error('Error:', error);
//     return { error: 'Failed to fetch data from Realtor.ca API' };
//   }
// }
// app.get("/get-data", async (req, res) => {
//   try {
//     const data = await fetchDataFromRealtorAPI();
//     res.json(data);
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).json({ error: 'Failed to fetch data from Realtor.ca API' });
//   }
// });
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
