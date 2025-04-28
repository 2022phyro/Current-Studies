# Async [Rust]

## Threads Basic

* *Concurrency*: used when we have several blocks of code running in parallel or simultaneously.  This is made possible via the use of *threads*. A thread is used to isolate a code block and run it in parallel, thus speeding up execution time by taking advantage of the multiprocessing capabilities of computers. Conside the example below

```
use std::thread; // Import the thread module from standard library

fn main() {
    println!("this will be printed");
    println!("this will also be printed");
    println!("Concurrency would start after this line");
    
    thread::spawn(|| {
        println!("Hello 1 from thread");
        println!("Hello 2 from thread");
        println!("Hello 3 from thread");
        println!("Hello 4 from thread");
        println!("Hello 5 from thread");
        println!("Hello 6 from thread");
        println!("Hello 7 from thread");
    })
    println!("Hello 1 from the main");
    println!("Hello 2 from the main");
}

```

* because threads execute in parallel, the order of execution is not determined and the system more or less determines this. Thus we don't know which result will occur first. `thread.spawn` is used to spawn a new thread in our code, seperate from the main thread.
* To ensure the spawn thread runs completely before the main thread below, we can make use of the `JoinHandle` type. Consider the example expanded below, assign the value to a variable and then make use of the join function to call the thread at once.
```

fn main() {
    println!("this will be printed");
    println!("this will also be printed");
    println!("Concurrency would start after this line");
    
    let t: JoinHandle<()> = thread::spawn(|| { // We use a unit type beause the closure returns nothing
        println!("Hello 1 from thread");
        println!("Hello 2 from thread");
        println!("Hello 3 from thread");
        println!("Hello 4 from thread");
        println!("Hello 5 from thread");
        println!("Hello 6 from thread");
        println!("Hello 7 from thread");
    })
    t.join(); // Calls the thread to be executed first
    println!("Hello 1 from the main");
    println!("Hello 2 from the main");
}i
```


## Multiple Threads and Ownership in Threads
* To use data from the main thread to a spawn, we either make use of the closure parameters or the `move` keyword. The move keyword lets us take ownership of the variables in the environment where the thread is created from. See example below
* For variables that implement the `Copy` trait, a copy of the data is made but for the values with the `Move` trait, the system has to be moved into scope hence our need for the keyword
* We need to use the `move` keyword with both the primitive and non primitive types


## Communication through Channels

* Channels are used to pass information between threads
* It operates in the FIFO (first in first out) order
* It always have a transmitter and a receiver. A part of the code is transmitting and the other part is receiving, either from the main thread or from another thread
* The channel ends when either the transmitter or receiver is dropped
* Rust implementation has this format, `mpsc-multiple producer single consumer`. ie there can be many creators of data but only one consumer
* The `mpsc::channel()`, command creates a new thread with a sender and receiver
```
   // -------------------------------------------
   // 			Message Passing through Channels 
   // -------------------------------------------
   use std::thread; 
   use std::sync::mpsc;
   fn main(){
    let (tx, rx) = mpsc::channel();

//    let rx1 = rx; 

    let t = thread::spawn(move || {
        let val = String::from("some data from sender"); 
        println!("Value sending from the thread"); 
        tx.send(val).unwrap();
       // println!("This may execute after the statement in the main"); 
       //  println!("Val is {:?}", val);
    });

    //let recieved = rx.recv().unwrap(); // blocks the thread and waits for output
    //println!("Recieved: {:?}", recieved); 

    t.join();
    let mut recieved_status = false; 
    while recieved_status != true {
        match rx.try_recv() { // tries to check if a value was received. Returns a Result Enum.
            Ok(recieved_value) => {
                println!("Recieved value is {:?}", recieved_value); 
                recieved_status = true; 
            },
            Err(_) => println!("I am doing some other stuff"),
        }
    }

   }
```

* Values sent from a specific thread in the channel are always received in a specific order. Consider the code below making use of multiple senders
```
   // -------------------------------------------
   // 			Sending Multiple Messages
   // 			Multiple Producers
   // 			Threads and Functions
   // -------------------------------------------

 /* 
use std::sync::mpsc;
use std::thread;
fn main() {
    let (tx, rx) = mpsc::channel();

    let t = thread::spawn(move || {
        let my_vec = vec![1,2,3,4,5];
        for i in my_vec {
            tx.send(i).unwrap(); 


        }
        
    });

     
    for recieved_vals in rx {
        println!("I recieved the value of {}", recieved_vals);
    }
    

    // you may use iterators in this case also
    /* 
    let recived_vals_vec  = rx.iter().collect::<Vec<i32>>();
    println!("The recieved values are {:?}", recived_vals_vec);
     */ 

}

 */ 

 /* 

use std::sync::mpsc;
use std::thread;
use std::time::Duration;

fn main() {
    let (tx, rx) = mpsc::channel();
    let tx1 = tx.clone();   // to be written after thread 2 code

    thread::spawn(move || {
        let my_vec = vec![1, 2, 3, 4, 5];
        for i in my_vec {
            tx.send(i).unwrap();
            thread::sleep(Duration::from_secs(1));

        }
    });

    thread::spawn(move || {
        // will get an error here stating that tx has been moved. 
        let my_vec = vec![6, 7, 8, 9, 10];
        for i in my_vec {
            tx1.send(i).unwrap();  // later on change to tx1
            thread::sleep(Duration::from_secs(1));

        }
    });

    for recieved_vals in rx {
        println!("I recieved the value of {}", recieved_vals);
    }
}

*/
 ```
* For threads infunctions, it is bette for us to make use of clone to clone the the sender, and send them to the the function. Once we're done, we would manually call the drop function to close the tx and signify the sender is done sending..
 ```

// Example 4: Creating threads inside a function 
use std::sync::mpsc;
use std::thread;
use std::time::Duration; 

fn timer(d: i32, tx: mpsc::Sender<i32>) {
    thread::spawn(move || {
        //thread::sleep(Duration::from_millis(d as u64)); 
        println!("{} send!",d); 
        tx.send(d).unwrap();
    });
}


fn main(){
    let (tx, rx) = mpsc::channel(); 
    for i in 0..5  {
        timer(i,tx.clone());
    } 

    drop(tx); // this will be written at the end 

    for recieving_val in rx {
        println!("{} recieved!", recieving_val);
    }
}

 
```

## Sharing states

* Here, we're not really sending and receiving data across channels. We're more like changing and mutating the same variable from different threads.
* `Mutex` makes it such that only one thread can access the data at a given time. For that period, no other thread can access it.

### Rules of Mutex

* You have to acquire a lock before you access a data
* You have to release a lock after using data, so the other threads can access it.


The mutex automatically gets released once the value goes out of scope without one necessarily need to release it by oneself.
* Creating a new mutex returns a smart pointer to the data that can then be used across the code to manipulate that data using dereferencing, etc.
* Calling multiple locks would block the thread after the first call would block the thread
```
   // -------------------------------------------
   // 			Sharing States
   // -------------------------------------------
use std::sync::Mutex; 
fn main() {
    let m = Mutex::new(5);

    /* 
    {
        let mut num = m.lock().unwrap();
        *num =  10;
    }

    println!("m = {:?}", m); 
    */ 

    let mut num = m.lock().unwrap(); 
    *num = 10;  
    drop(num);

    let mut num1 = m.lock().unwrap();      
    *num1 = 15;
    drop(num1);

}
```

## Passing Mutexes between threads

* To pass mutexes between threads, we have to take note of the problems of multiple owners for mutable data. we handle it by making use of the `Atomic Reference Pointer` or `Arc` present in `std::sync::Arc`. this is a primitive for almost all asynchronous types and works like a RefCel smart pointer. the Arc data type is powerful and can let us achieve a lot of stuff in it

## Synchronization through Barriers

* Barriers are used in multiple thread systems and they block execution till every thread reaches that particular point in the code. Thus it can be used to pause code to enable synchronization. There exists the problem that if used incorrectly, `Barrier` can block your code. As susal, it is created wrapped around an `Arc` to enable us share clones of the same Barrier instance, thus we can begin the process.
```
   // -------------------------------------------
   // 			Barriers
   // -------------------------------------------
/* 
use std::thread;
use std::sync::Arc;
use std::sync::Barrier;

fn main() {

    let mut threads = Vec::new();
    let barrier = Arc::new(Barrier::new(5));

    for i in 0..10 { 
        let barrier = barrier.clone();
        let t = thread::spawn(move || {
            println!("before wait {}", i);
            barrier.wait();
            println!("after wait {}", i);
        });
        threads.push(t);
    }

    for t in threads {
        t.join().unwrap();
    }
}
*/ 


use std::sync::Arc;
use std::sync::Barrier;
use std::sync::Mutex;
use std::thread;

fn main() {
    let mut threads = Vec::new();
    let barrier = Arc::new(Barrier::new(3));
    let data = Arc::new(vec![
        vec![1, 2, 3, 4, 5, 6],
        vec![1, 2, 3, 4, 5, 6],
        vec![1, 2, 3, 4, 5, 6],
    ]);

    let result = Arc::new(Mutex::new(0));

    for i in 0..3 {
        let barrier = barrier.clone();
        let data = data.clone();
        let result = result.clone();
        let t = thread::spawn(move || {
            
            let x:i32 = data[i][0..3].iter().sum();
            *result.lock().unwrap() += x; 

            //let mut x = result.lock().unwrap();
            //*x = data[i][0..3].iter().sum();
          
            println!("Thread {} Part 1 is done", i);
            barrier.wait();


            let x: i32 = data[i][3..6].iter().sum();  
            *result.lock().unwrap() += x;              
            //*x = data[i][3..6].iter().sum();

          
            println!("Thread {} is complete ", i);
        });
        threads.push(t);
    }

    for t in threads {
        t.join().unwrap();
    }

    println!(
        "The final value of hte result is {}",
        *result.lock().unwrap()
    );
}
```

## Scoped threads
* This allows us to define scopes that limit the thread created to that of a single defined scope. This would let us make use of all the advantanges of scoped data and still not having to bother around dropping a variable or creating a lot of threads everywhere because we can't limit them to a scope

```
// -------------------------------------------
// 			 Scope Threads
// -------------------------------------------

use std::thread;

fn main() {
    let mut vec = vec![1, 2, 3];
    let mut x = 0;

    thread::scope(|some_scope| {
        some_scope.spawn(|| {
            println!("I am first thread in the scope");
            println!("{:?}", vec);
        });

        some_scope.spawn(|| {
            println!("I am second thread in the scope");
            x += 45;
            // vec.push(4);
            println!("{:?}", vec);
        });
    });

    println!("The threads are now complete");
    vec.push(5);
    println!("x: {:?} and vec: {:?}", x, vec);
}
```


## Thread Parking
This is used to pause a thread for a particular time until we want to resume that particular thread.. sort of like Barrier but in this case we're working with just our thread. The advantages of this feature allow us to set timeouts, sleep, etc for our codes. Eg below
```
 use std::thread; 
   use std::time::Duration;
   fn main() {
    let job_1 = thread::spawn(|| {
        println!("-- Job 1 has started -- "); 
        println!("Waiting for job 2 to complete"); 
        //thread::park_timeout(Duration::from_secs(2));
        //thread::sleep(Duration::from_secs(2));   
        thread::yield_now();

        println!("-- Job 1 resumed --"); 
        println!("-- Job 1 finished"); 
    });

    let job_2 = thread::spawn(|| {
        println!("-- Job 2 started --"); 
        println!(" -- Job 2 finished --"); 
    }); 
    job_2.join().unwrap(); 
    println!("Job 2 is now completed"); 
    println!("Job 1 will now resume"); 
    job_1.thread().unpark(); 
    job_1.join().unwrap();
   }
```

## Async/Await in Rust

In asynchronous code, the functions, etc are non-blocking which means, they can yield control of the runtime, during which they are executed and later on return the result or retrieve control and continue on its normal execution
* Created with the `async` keyword in front of the function, closure, code block, etc..
* Async methods return `Futures`. These work like JS Promises and we need to either await them using the `.await` method or to poll it.

* This presents a problem for us when making use of async in the main function as the main function isn't allowed to be async, and an async function can only be awaited inside another async function. To fix this, we make use of the *tokio* crate. The tokio crate contains a lot of functions and all designed for handling async programming in Rust. We make use of the `tokio::main` trait to match it as async. See examples below
```
  async fn printing(){
    println!("I am async function");
   }

   #[tokio::main]
   async fn main(){ 
    let x = printing();
    println!("The has not being polled yet"); 
    x.await;

   }
```

## Async/Await (Tasks and Select)

* Here we can make use of the async/await process with more advantages.
* Tasks are lightweight non-blocking unit of execution. They are set up by tokio runtime itself instead of our underlying operating system. This lets us avoid costly context switching and the overhead involved in involving the runtime..
* `Select`: This run multiple tasks asynchronously and acts upon the one that executes first.

Consider the example of all these below
```

// #[tokio::main]
// async fn main() { 
//     let mut handles = vec![]; 
//     println!("This code is not part of the async block"); 
//     let s1 = String::from("Huge Computation function"); 
//     let s2 = String::from("Simpler Computation function");  
//     let aw1 = tokio::spawn(async move {
//         huge_computation(s1).await;
//     });
//     handles.push(aw1);

//     let aw2 = tokio::spawn(async move {
//         simpler_computation(s2).await;
//     }); 
//     handles.push(aw2); 

//     for handle in handles {
//         handle.await.unwrap(); 
//     }
//     println!("All tasks are now completed"); 
// }

// async fn huge_computation(s: String) {
//     println!("{:?} has started", s); 
//     for i in 0..100_000_000{

//     }
//     println!("{:?} is now completed", s);
// }
// async fn simpler_computation(s: String) {
//     println!("{:?} has started", s); 
//     println!("{:?} is now completed", s); 
// }

use tokio::select; 
#[tokio::main] 
async fn main() {
    // tokio::select! {
    //     _ = function_1() => println!("Function 1 is completed first"), 
    //     _ = function_2() => println!("Function 2 is completed first"), 
    // };

    // let aw1 = tokio::spawn(async move {
    //     function_1().await;
    // }); 

    // let aw2 = tokio::spawn(async move {
    //     function_2().await;
    // }); 

    // tokio::select! {
    //     _ = aw1 => println!("Function 1 is selected"), 
    //     _ = aw2 => println!("Function 2 is selected"),
    // }; 

    tokio::join!{
        function_1(), 
        function_2(),
    };

    
}

async fn function_1() {
    println!("Function 1 has started"); 
    for i in 0..100_000_000 {

    }
    println!("Function 1 has ended"); 
} 

async fn function_2() {
    println!("Function 2 has started"); 
    println!("Function 2 has ended");
}
```
