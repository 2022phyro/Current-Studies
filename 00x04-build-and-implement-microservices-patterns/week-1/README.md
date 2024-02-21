# Monolithic Applications

- A single tiered software application
- Logic, database, client structure are all combined into a single application
- It is an independent unit and is deployed and treated as a unit

## Cons of Monolithic Applications

- Tight coupling btw componenets
- Overloading web container
- Large code base
- Less scalable
- Obstacles in continous deployment
- More deployment and restart times
- New technology barriers
- Long term commitment to a tech stack


## Microservices

- An architectural style/approach that develops a single application as a suite of small services

### Pros
 
- Modular
- Single Functionality Principle
- Asynchronous invocation
- Independent Deployment and Scalability
- Self Contained
- Fault tolerant
- Loose Coupling
- Well Defined communication between services
- Extensible
- Multiple Technology support
- Faster release cycles

### Cons

- Visibility - Challenging to discover individual services built by different developers as they are brought live
- Bounded Context - Challenging to set the functional boundaries of each service
- Configuration Management - Difficult to have a centralized configuration with multiple serves developed in different libraries
- Scaling - Challenging to set up a load balancing architecture to scale up or scale down the service availabilities
