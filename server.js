/*const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./config/dbConfig');
const Gamer = require('./model/gamerModel');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;

dbConnection();

app.use(express.json());
app.use(cors());

app.post('/api/save-score', async (req, res) => {
    const { nickname, level, score } = req.body;

    const gamer = new Gamer({ nickname: nickname, level: level, score: score, timestamp: new Date() });
    try {
        await gamer.save();
        res.status(201).send('Score saved successfully');
    } catch (error) {
        res.status(500).send('Error saving score');
    }
});

app.get('/api/top-scores', async (req, res) => {
    try {
        const topScores = await Gamer.find().sort({ score: -1 }).limit(5);
        res.json(topScores);
    } catch (error) {
        res.status(500).send('Error fetching top scores');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});*/

const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./config/dbConfig');
const Gamer = require('./model/gamerModel');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 4000;

dbConnection();

app.use(express.json());
app.use(cors());

app.post('/api/save-score', async (req, res) => {
    const { nickname, level, score } = req.body;

    try {
        const existingGamer = await Gamer.findOne({ nickname: nickname });
        
        if (existingGamer) {
            if (score > existingGamer.score) {
                existingGamer.score = score;
                existingGamer.level = level;
                existingGamer.timestamp = new Date();
                await existingGamer.save();
                res.status(200).send('Score updated successfully');
            } else {
                res.status(200).send('Existing score is higher or equal. No update needed.');
            }
        } else {
            const newGamer = new Gamer({ nickname: nickname, level: level, score: score, timestamp: new Date() });
            await newGamer.save();
            res.status(201).send('Score saved successfully');
        }
    } catch (error) {
        res.status(500).send('Error saving score');
    }
});

app.get('/api/top-scores', async (req, res) => {
    try {
        const topScores = await Gamer.find().sort({ score: -1 }).limit(5);
        res.json(topScores);
    } catch (error) {
        res.status(500).send('Error fetching top scores');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});