require("dotenv").config()
const { createClient } = require('redis');
const redisClient = createClient({
    password:process.env.REDIS_PASSWORD ,
    socket: {
        host: 'redis-14878.c212.ap-south-1-1.ec2.redns.redis-cloud.com',
        port: 14878
    }
});

redisClient.on('error', (err) => {
    console.error('Redis error:', err);
});

redisClient.on('connect', () => {
    console.log('Connected to Redis');
});

redisClient.on('ready', () => {
    console.log('Redis client is ready');
});

redisClient.connect().catch(console.error);

module.exports = redisClient;
