import Redis from "ioredis";

export const redis = new Redis(process.env.REDISPORT ? parseInt(process.env.REDISPORT) : 6379, process.env.REDISHOST ? process.env.REDISHOST : "127.0.0.1");