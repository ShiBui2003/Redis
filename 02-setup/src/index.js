import express from 'express';
import Redis from 'ioredis';
import mongooese from 'mongoose';

const app = express();


const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');


app.get('/redis',async(req,res)=>{
    const reply = await redis.ping();
    res.json({message:reply});
})


app.get('/mongo',async(req,res)=>{
    const url = pro;
})
