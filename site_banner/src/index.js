import express from 'express';
import Redis from 'redis';

const app  = express();
app.use(express.json());

const redis = new Redis(process.env.Redis_URL || 'redis://localhost:6379');

const BANNER_KEY = 'app:banner';
app.post("/banner",async(req,res)=>{
    await redis.set(BANNER_KEY,req.body.banner ||"welcome");
        res.json({success: true});
});

