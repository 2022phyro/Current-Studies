const amqp = require("amqplib/callback_api");
//create conn
const receiveFromRabbitMQ = () => {
  amqp.connect("amqp://localhost", (err, connection) => {
    if (err) {
      console.error("Failed to connect to RabbitMQ:", err);
      return;
    }
    connection.createChannel((err, channel) => {
      if (err) {
          console.error("Failed to create a channel:", err);
          return;
      }
      const exchange = 'logs';
      const queue = 'log_queue';

      channel.assertExchange(exchange, 'fanout', {
      });

      channel.assertQueue(queue, {
      }, (err, q) => {
        if (err) {
          console.error("Failed to assert a queue:", err);
          return;
        }
        channel.bindQueue(q.queue, exchange, '');

        channel.consume(q.queue, (msg) => {
          if(msg.content) {
            console.log("Received: %s", msg.content.toString());
          }
        }, {
          noAck: true
        });
      });
    });
  });
};

module.exports = { receiveFromRabbitMQ };
