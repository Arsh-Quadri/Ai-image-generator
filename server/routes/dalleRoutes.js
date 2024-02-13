import express from "express";
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from "openai";
import axios from 'axios'

import { v2 as cloudinary } from 'cloudinary';


dotenv.config();

const router = express.Router();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,

})

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
var openai = new OpenAIApi(configuration);

router.route('/').get((req, res) => {
    res.status(200).json({ message: 'Hello from DALL-E!' });
});

// open AI

// router.route('/').post(async (req, res) => {
//     try {
//         const { prompt } = req.body;

//         const aiResponse = await openai.createImage({
//             prompt,
//             n: 1,
//             size: '1024x1024',
//             response_format: 'b64_json',
//         });

//         const image = aiResponse.data.data[0].b64_json;
//         res.status(200).json({ photo: image });
//     } catch (error) {
//         console.error(error);
//         res.status(500).send(error?.response.data.error.message || 'Something went wrong');
//     }
// });

// Rapid Api

router.route('/').post(async (req, res) => {
    try {
        const { prompt } = req.body;

        const options = {
            method: 'POST',
            url: 'https://chatgpt-42.p.rapidapi.com/texttoimage',
            headers: {
                'content-type': 'application/json',
                'X-RapidAPI-Key': process.env.RAPID_API_KEY,
                'X-RapidAPI-Host': 'chatgpt-42.p.rapidapi.com'
            },
            data: { text: prompt }
        };

        const response = await axios.request(options);
        const image = response.data;
        const photoUrl = await cloudinary.uploader.upload(image.generated_image);

        // console.log(photoUrl)
        res.status(200).json({ photo: photoUrl });
        // res.status(200).json({ photo: "https://res.cloudinary.com/dhpe0g5zg/image/upload/v1679127218/gstr1oovc28mbw6zxw3l.png" });
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message || 'Something went wrong');
    }
});
export default router;