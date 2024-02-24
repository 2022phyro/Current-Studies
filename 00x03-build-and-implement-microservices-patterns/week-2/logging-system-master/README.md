# Problem Statement - Logging System

A logging system generates a detailed set of events that happen within an application. Logging helps to troubleshoot your system when an error occurs. In web applications, logging can help in tracing user details. ​

Deliver log messages to multiple consumers or applications that require data from the user logs collected using the publish-subscribe model.

Build an asynchronous log system using the publish-subscribe model to send a notification message to multiple consumers that would require the message. Use Node.js to build a producer that can emit a message to the multiple messaging queues using RabbitMQ. It will be consumed by multiple consumers.​

## Tasks

- Pull the image of RabbitMQ and run a docker container for the same. ​
- Use the npm install command to install the amqplib dependencies. ​
- Create a Producer that will produce log messages to all its consumers.
- Broadcast the log messages to consumers. Use the fanout exchange. ​
- Create a Consumer to consume the messages from the queue. ​
- Execute the Producer program using the node command.
- Execute the Consumer program using the node command. ​
- Create multiple instances of the Consumer program. ​
- In the RabbitMQ management, check if the message gets broadcasted to all the consumer instances.​

# Instructions

1. Download and unzip the boilerplate code.
2. Run the command `npm install` to install the dependencies.
3. Open the boilerplate code in VSCode to develop the solution.
4. Write the logic in **.js** file present in **src** folder
5. Start the reciever using `node src/receiver.js` command
6. Start the sender using `node src/sender.js` command
7. Verify the output on the console

## Setup

1. Run the docker container for RabbitMQ using `docker run -it --rm --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3.9-management` command
2. Login to the RabbitMQ console using user name as **guest** and password as **guest** on the browser

## Testing the application

- Run the test scripts available under **src/test** by giving `npm run test` command in the terminal to test locally.
- Ensure that the mandatory test cases pass.
- Refactor the solution to ensure all test cases are passing.
- Zip the solution code with the name same as assignment name.
- Upload the zipped solution for submission.
