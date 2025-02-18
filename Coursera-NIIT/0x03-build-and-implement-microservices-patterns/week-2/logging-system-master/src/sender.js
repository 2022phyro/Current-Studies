const amqp = require('amqplib/callback_api')
//create conn
const sendToRabbitMQ = (msg)=>{
    amqp.connect("amqp://localhost", (err, connection) => {
        if (err) {
            throw err;
        }
        connection.createChannel((err, channel) => {
            if (err) {
                throw err;
            }
            const queue = "log_queue";
            channel.assertQueue(queue, {
            });
            channel.sendToQueue(queue, Buffer.from(msg));
            setTimeout(() => {
                connection.close();
            }, 500);
        });
    });
    return true
}

module.exports ={sendToRabbitMQ}

 