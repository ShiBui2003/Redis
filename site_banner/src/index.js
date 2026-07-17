import express from 'express';
import Redis from 'ioredis';

const app  = express();
app.use(express.json());

const redis = new Redis(process.env.Redis_URL || 'redis://localhost:6379');

const BANNER_KEY = 'app:banner';
app.post("/banner",async(req,res)=>{
    await redis.set(BANNER_KEY,req.body.banner ||"welcome");
        res.json({success: true});
});


//for getting the banner
app.get("/banner",async(req,res)=>{
const message = await redis.get(BANNER_KEY);
    res.json({banner: message});
});


//for deleting the banner
app.delete("/banner",async(req,res)=>{
    await redis.del(BANNER_KEY);
    res.json({success: true});
});

//for checking if the banner exists
app.get("/banner/exists",async(req,res)=>{
    const exists = await redis.exists(BANNER_KEY);
    res.json({exists: Boolean(exists) === 1});
});


app.listen(3000,()=>{
    console.log("Server is running on port 3000");
});
