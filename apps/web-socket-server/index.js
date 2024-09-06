const WebSocket = require('ws');
const redisClient = require('@repo/redis-service'); // Reuse the already connected client

const wss = new WebSocket.Server({ port: 8080 });
const merchantConnections = {};

// WebSocket connection handling
wss.on('connection', (ws, req) => {
    try {
        const url = new URL(req.url, `https://${req.headers.host}`);
        const merchantId = url.searchParams.get('merchantId');

        if (merchantId) {
            console.log("User connected with merchantId:", merchantId);
            merchantConnections[merchantId] = ws;
        } else {
            console.log("No merchantId provided, closing connection.");
            ws.close();
        }

        ws.on('message', (message) => {
            console.log('Received message:', message);
        });

        ws.on('close', () => {
            if (merchantId) {
                delete merchantConnections[merchantId];
                console.log("User disconnected, merchantId:", merchantId);
            }
        });

        ws.onerror = (error) => {
            console.error("WebSocket error:", error);
        };
    } catch (error) {
        console.error("WebSocket connection error:", error);
        ws.close();
    }
});

// Redis queue consumer function
async function startRedisConsumer() {
    console.log("Listening for payment messages...");

    while (true) {
        try {
            const message = await redisClient.brPop('payments_queue', 0);  // Await BRPOP to block
            console.log("BRPOP executed, message:", message);

            // Access the 'element' property, which contains the JSON string
            if (message && message.element) {
                try {
                    const paymentData = JSON.parse(message.element); // Parse the 'element' property
                    const ws = merchantConnections[paymentData.merchantId];

                    if (ws && ws.readyState === WebSocket.OPEN) {
                        ws.send(paymentData.message);
                        console.log(`Payment message sent to merchant ID ${paymentData.merchantId}`);
                    } else {
                        console.log(`No WebSocket connection found or connection is closed for merchant ID ${paymentData.merchantId}`);
                    }
                } catch (parseError) {
                    console.error("Error parsing payment message JSON:", parseError);
                }
            } else {
                console.log('No valid message retrieved from the queue');
            }
        } catch (error) {
            console.error('Error in Redis consumer:', error);
        }
    }
}

startRedisConsumer();


