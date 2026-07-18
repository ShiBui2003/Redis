import express from "express";
import Redis from "ioredis";


const app = express();
app.use(express.json());       
const redis = new Redis(process.env.REDIS_URL || "redis://localhost:6379");

function otpKey(phone){
    return `otp:${phone}`;
}


app.post('/otp',async(req,res)=>{
    const{phone} = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await redis.set(otpKey(phone), otp, 'EX',30);//otp valio for 30 secs
    res.json({message:'OTP SENT',otp});
});

app.