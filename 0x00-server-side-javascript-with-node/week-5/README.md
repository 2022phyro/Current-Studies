# FILE STORAGE AND HANDLING


## The `fs` module
Fs for file system, this module is  core JS module (___it is built into the Node JS runtime___) and it allows us to work with files on my computer's file system and implement IO operations. Using this we can
* Create files and directories
* Modify files and directories
* Delete files and directories
We can handle these files in two ways i.e. synchronously or asynchronously
<br>
    * *Synchronously*:
    We can read and manipulate files synchronously and the thread will wait until the file has been completely manipulated.Consider the following example below
    ```
    const fs = require('fs')
    try {
        const data = fs.readFileSync("Demo.txt", "utf-8")
        console.log(data)
    } catch (err) {
        console.error(err)
    }
    ```
    Here we use the readFileSync method to read the file synchronously, the first parameter is the `path` which can be a file path/url/buffer/file descriptor and the second is the encoding which is "utf-8"
    * *Asynchronously*: The fs module also provides methods for dealing with filesasynchronously. For each synchronous method, there is an asynchronous counterpart

## Streams and buffers: 
This is a way to handle reading and writing to files, network communications and end to end information exchange. Eg when you tll a program to read a file, it is read completely and held in memory before being processed. Streams mean that it is read in bits and processed as each stream is gotten . Another use case is in scenarios where the file is far larger than the available memory, then a stream can be used. Streams are both 
* memory efficient (__as one does not need to hold it in memory each time__)
* time efficient (___Takes less time to start processing the data as it begins immediately___)
### Types of streams
* Readable: You can pipe from but not pipe into, When a stream is readable, it is buffered until it is needed if it is not processed immediately. You can receive but you canno send

* Writable: You can pipe into but not from i.e you can send but not receive
* Duplex: You can both send and receive 
* Transform: A stream similar to duplex but then the output is a compression  of the input

**Implementing A Readable Stream**:
<br>
This can be implemeted in two ways:
* Flowing: Data is read from the underlying system automatically through the EventEmitter Interface. You listen to a data event and attach a callback that is executed whenever the stream emits that data event
Eg:
```
const fs = require('fs')
const flowingStream = fs.createReadStream('file.txt', 'utf-8');

flowingStream.on('data', (data) => {
    console.log(data);
    });
flowingStream.on('end', () => {
    console.log("End of flowing stream reached");
    });
```
* Paused: The `stream.read()` method is called explicitly to read from it. 
**Commonly used events**:
<br> 
|event|When it is emitted|
|:---|:---|
|data|When readable data is available|
|finish|When the stream is done writing|
|error|When an error occurs during reading/writing data|
|end|When the stream has finished reading|

## Buffer:
A buffer represents a fixed chunk of memory in the computer. It is available by the JavaScript runtime and was introduced to help
developers deal with binary data in Javascript
Can be created through the `Buffer.from()`, `Buffer.alloc()`, `Buffer.allocUnsafe()`.
- When working with streams and files we usually use buffers
- It holds binary data that can be converted to other formats
- Buffer length returns the size of the buffer itself and not the size of the content
- Optimized for working with TCP streams and file systems

### Manipulating buffers
```
const buffer = Buffer.alloc(100)  // Creating a buffer
buffer.write("Happy Learning to Alll!!");
const output = buffer.toString("utf-8");
console.log(output)


console.log(Buffer.isBuffer(buffer)); // Confirming if a given variable is a buffer

console.log(buffer.length);   // Getting the buffer's length

const bufferSrc = Buffer.from("hello") // Copying Buffers
const dest = Buffer.alloc(5)
bufferSrc.copy(dest);
const data = dest.toString("utf-8");
console.log(data)
```

## Events
This is a very core aspect of Node Js and comes built into the Node JS runtime. Event's are more like transmissions of a raid that you "listen" for and perform callbacks upon getting them. we have alread seen some event types earlier int he stream.
An eventEnitter is used to emit custom events
Conside the following piece of code
```
const EventEmitter = require('events')
const emmitter = new EventEmitter();
emitter.on('messageLogged', ()=> {
    console.log('User has logged a message');
});

// signal the event by emitting it
emitter.emit('messageLogged')
```
EventEmmitters are characterized by their ability to listen for events and perform
actions on receiving such events as well as emit events of their own

We can decide to listen to events only once when it occurs and not every time. this can be achieved as seen below using `emitter.once`
```
const EventEmitter = require('events')
const emmitter = new EventEmitter();
emitter.once('messageLogged', ()=> {
    console.log('User has logged a message');
});

// signal the event by emitting it
emitter.emit('messageLogged')
emitter.emit('messageLogged')
emitter.emit('messageLogged')
emitter.emit('messageLogged')

```

