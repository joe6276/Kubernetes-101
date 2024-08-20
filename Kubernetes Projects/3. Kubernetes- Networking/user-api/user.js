const express = require('express');
const { json } = require('express');
const axios = require('axios');
const app = express();
app.use(json());

app.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    // Validate input
    if (!email || email.trim().length === 0 || !password || password.trim().length === 0) {
        return res.status(422).json({ message: 'Enter a valid email or password' });
    }

    try {
        // Send password to hashing service
        // Assuming the hashing service expects a POST request
        const response = await axios.get(`http://${process.env.AUTH_ADDRESS}/hash/${password}`);
        const hashedPW = response.data.hashedPassword; // Adjust based on the actual response format

        console.log(email, hashedPW);
        return res.status(201).json({ message: 'User Created' });
    } catch (err) {
        console.error('Error:', err.message); // Log error message for debugging
        return res.status(500).json({ message: 'Creating the user failed - please try again later.' });
    }
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
