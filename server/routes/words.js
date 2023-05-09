import express from 'express';
import {Configuration, OpenAIApi} from 'openai';
import {API_KEY} from '../config/openai.js';
import Word from '../models/Word.js';
import FiveWord from '../models/FiveWords.js';
const router = express.Router();

const configuration = new Configuration({
    apiKey: `${API_KEY}`,
});
const openai = new OpenAIApi(configuration);

router.post('/uploadWord', (req, res) => {
    const word = new Word(req.body);

    Word.findOne({userId: req.body.userId, word: req.body.word}).exec((err, result) => {
        if (result) return res.status(201).json({success: false, message: '이미 존재하는 단어입니다.'});

        word.save((err, word) => {
            if (err) return res.status(400).json({success: false, err});
            return res.status(200).json({success: true});
        });
    });
});

router.post('/getWord', (req, res) => {
    Word.find({userId: req.body.userId})
        .populate('userId')
        .exec((err, words) => {
            if (err) return res.status(400).send(err);
            res.status(200).json({success: true, words});
        });
});

router.post('/uploadFiveWords', (req, res) => {
    const wordsArr = new FiveWord(req.body);

    FiveWord.findOneAndDelete({userId: req.body.userId}, (err, res) => {
        if (err) {
            console.log(err);
        } else {
            console.log(res);
        }
    });

    wordsArr.save((err, words) => {
        if (err) return res.status(400).json({success: false, err});
        return res.status(200).json({success: true, words});
    });
});

router.post('/getFiveWords', async (req, res) => {
    const isNull = await FiveWord.exists({userId: req.body.userId});
    if (!isNull) return res.status(201).json({message: '현재 단어 x'});

    FiveWord.find({userId: req.body.userId})
        .populate('userId')
        .exec((err, words) => {
            if (err) return res.status(400).send(err);
            const result = words[0].arr;

            return res.status(200).json({success: true, result});
        });
});

router.post('/quiz', async (req, res) => {
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

    // try {
    //     const comp = await openai.createCompletion({
    //         model: 'davinci:ft-student-2023-05-06-16-28-13',
    //         prompt: prompt,
    //         max_tokens: 200,
    //     });
    //     if (comp.data) {
    //         console.log('choices: ', comp.data.choices);
    //     }
    // } catch (err) {
    //     console.log('err: ', err);
    // }
});

export default router;
