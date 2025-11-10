import amqp, {type Channel, type ChannelModel} from 'amqplib';

export let amqp_connection: ChannelModel | null = null;
export let amqp_channel: Channel | null = null;

/**
 * @description Connects to RabbitMQ and creates a channel. Called once on startup.
 */
export const connectRabbitMQ = async (): Promise<void> => {
    try {
        if (!amqp_connection) {
            amqp_connection = await amqp.connect(process.env.RABBITMQ_URL || 'amqp://localhost');
            amqp_channel = await amqp_connection.createChannel();
            console.log('[RabbitMQ] RabbitMQ connected successfully.');
        }
    } catch (err) {
        console.error('[RabbitMQ] RabbitMQ failed to connect:', err);
        throw err; // Throw error to prevent server from starting if RabbitMQ is down
    }
};

export const closeRabbitMQConnection = async (): Promise<void> => {
    try {
        if (amqp_channel) {
            await amqp_channel.close();
            console.log('[RabbitMQ] Channel closed successfully.');
        }
        if (amqp_connection) {
            await amqp_connection.close();
            console.log('[RabbitMQ] Connection closed successfully.');
        }
    } catch (err) {
        console.error('[RabbitMQ] Error closing connection:', err);
    }
}
