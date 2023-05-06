import express from 'express';
import {Configuration, OpenAIApi} from 'openai';
import {API_KEY} from '../config/openai.js';

const router = express.Router();

const configuration = new Configuration({
    apiKey: `${API_KEY}`,
});
const openai = new OpenAIApi(configuration);

router.post('/chat', async (req, res) => {
    const prompt = req.body;
    console.log(prompt);

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
            res.json({
                message: completion.data.choices[0].message,
            });
        }
    }
});

export default router;

// router.post('/post', (req, res) => {
//     const role = new Role(req.body);

//     role.save((err, roleInfo) => {
//         if (err) return res.json({success: false, err});
//         return res.status(200).json({success: true, roleInfo});
//     });
// });

// router.post('/chat', async (req, res) => {
//     const {prompt} = req.body;

//     console.log(prompt);
//     const response = await openai.createCompletion({
//         model: 'text-davinci-003',
//         prompt: `${prompt}`,
//         temperature: 0.9,
//         max_tokens: 150,
//         top_p: 1,
//         frequency_penalty: 0,
//         presence_penalty: 0.6,
//         stop: [' Human:', ' AI:'],
//     });

//     console.log(response.data.choices[0].text);
//     res.send(response.data.choices[0].text);
// });
