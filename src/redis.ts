import Redis from "ioredis";

export const redis = new Redis({
    port: process.env.REDISPORT ? parseInt(process.env.REDISPORT) : 6379, 
    host: process.env.REDISHOST ? process.env.REDISHOST : "127.0.0.1",
    password: process.env.REDISPASSWORD ? process.env.REDISPASSWORD : "127.0.0.1",
})