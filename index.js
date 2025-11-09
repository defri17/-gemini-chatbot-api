import 'dotenv/config';

import express from 'express';
import cors from 'cors';
import { GoogleGenAI } from '@google/genai';
import e from 'express';


const app =express();

const ai= new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY})


const GEMINI_MODEL="gemini-2.5-flash";


// app.use(cors())
app.use(express.json());
const PORT = process.env.PORT;
app.listen(PORT, ()=>console.log(`Server ready on http://localhost:${PORT}`));



app.post('/api/chat', async(req, res)=>{
    const {messages}= req.body;
    try {
        
        if(!Array.isArray(messages)) throw new Error('Messages must be an array!');
        
        const contents=messages.map(({role, text}) => ({
                role,
                parts:[{text}]
         }));

         const response=await ai.models.generateContent({
           model:GEMINI_MODEL,
           contents 
        });

        res.status(200).json({result:response.text});
    } catch (error) {
        console.log(error);
        res.status(500).json({message:error.message});
    }

});

app.use(express.static('public'))

