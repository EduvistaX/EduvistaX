const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

mongoose.connect('mongodb://127.0.0.1:27017/InviDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});

db.once('open', () => {
    console.log('Connected to PracticeDB database');

    const app = express();
    const port = 5001;

    // Schema for users of the app
    const UserSchema = new mongoose.Schema({
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
    });

    const User = mongoose.model('users', UserSchema);

    // Define Schema and Model for Chat Messages (for chatbot)
    const chatSchema = new mongoose.Schema({
        user: String,
        message: String,
    });

    const Chat = mongoose.model('Chat', chatSchema);

    // Enable CORS and JSON parsing middleware
    app.use(cors());
    app.use(express.json());

    // Test endpoint
    app.get('/', (req, resp) => {
        resp.send('App is Working');
    });

    // Registration endpoint
    app.post('/register', async (req, resp) => {
        try {
            const user = new User(req.body);
            let result = await user.save();
            result = result.toObject();
            if (result) {
                // Fix the deletion of 'password' to 'pwd'
                delete result.pwd;
                resp.status(201).json(result); // Send the created user data as JSON
                console.log(result);
            } else {
                console.log('User already registered');
                resp.status(400).json({ error: 'User already registered' });
            }
        } catch (e) {
            console.error(e);
            resp.status(500).send('Something Went Wrong');
        }
    });

    // Endpoint to handle incoming chat messages for the chatbot
    app.post('/api/messages', async (req, res) => {
        const { user, message } = req.body;

        try {
            // Save incoming chat message to MongoDB
            const newMessage = new Chat({ user, message });
            await newMessage.save();

            // For demonstration purposes, sending a dummy response from the chatbot
            const botResponse = 'This is a sample response from the chatbot.';
            res.json({ botResponse });
        } catch (error) {
            console.error('Error handling chat message:', error);
            res.status(500).json({ error: 'Error handling chat message' });
        }
    });

    // Start the server
    app.listen(port, () => {
        console.log(`App listening at http://localhost:${port}`);
    });
});
