import { createClient } from 'redis';

// Define the type for our client for clarity
type RedisClient = ReturnType<typeof createClient>;

// Create the client instance. It will be shared across the entire application.
export const redisClient: RedisClient = createClient({
    // url: 'redis://user:password@redis-server:6379' // Example with password
});

// Centralized error handling
redisClient.on('error', (err) => {
    console.error('Redis Client Error:', err);
});

/**
 * @description Connects to the Redis server. This should be called once when the application starts.
 */
export const connectRedis = async (): Promise<void> => {
    if (!redisClient.isOpen) {
        try {
            await redisClient.connect();
            console.log('[Redis] Connected to Redis server successfully.');
        } catch (err) {
            console.error('[Redis] Could not connect to Redis server:', err);
        }
    }
};

