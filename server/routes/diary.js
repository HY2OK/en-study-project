import express from 'express';
import {Configuration, OpenAIApi} from 'openai';
import {API_KEY} from '../config/openai.js';
import Diary from '../models/Diary.js';

const router = express.Router();

const configuration = new Configuration({
    apiKey: `${API_KEY}`,
});
const openai = new OpenAIApi(configuration);

router.post('/update', async (req, res) => {
    const prompt = req.body;

    const completion = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: prompt,
        temperature: 0.9,
        max_tokens: 150,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0.6,
    });

    if (completion.data) {
        if (completion.data.choices) {
            console.log(completion.data.choices[0].message);
            res.json({
                message: completion.data.choices[0].message,
            });
        }
    }
});

router.post('/save', async (req, res) => {
    const diary = new Diary(req.body);
    diary.save((err, info) => {
        if (err) return res.status(400).json({success: false, err});
        return res.status(200).json({success: true, info});
    });
});

router.post('/getDiary', async (req, res) => {
    Diary.find({userId: req.body.userId})
        .populate('userId')
        .exec((err, info) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({success: true, info});
        });
});

export default router;
