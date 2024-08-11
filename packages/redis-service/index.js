require('dotenv').config(); 
const { createClient } = require('redis');


const redisClient = createClient({
    password: "h5PmAVk64gH6AsuAOtj2XfXqKi4irVM7",
    socket: {
        host: 'redis-12886.c301.ap-south-1-1.ec2.redns.redis-cloud.com',
        port: 12886
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
