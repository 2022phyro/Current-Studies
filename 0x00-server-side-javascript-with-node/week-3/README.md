# Understanding Modules
Modules make it possible to take advantage of different aspects of our code. Using modules we
are able to reuse our functions, variables and objects in other files.
A module is 
- a simple or complex functionality organized in a single or multiple JavaScript files
- can be reused throughout the Node JS application
- can be marked for export so that it can be imported into other files
- is a logical encapsulation of code in a single unit

## Common JS module Specifications
This is the standard method and use of working with NOde JS modules. The modules are loaded synchronously
and processed in the order they are found. It has two primary parts:
- a variable named __exports__ which contain the functions and variables that the modules wishes
- to make available to other programs
- a function named __require__ to import the exported functions and variables for usage

## Different Module Types
### Built in modules:
These modules are bundled into NOde JS at runtime and are available for use to manipulate core
functionalities of the program
eg include th `os` module for manipulating operating system informations, the `file` module for
manipulating files, etc
### User Defined Modules
these are modules that are created by the user for use in his application or his package
### External Modules:
These are modules made available by _npm_. **npm** is a cli tool to access the NPM registry which is the largest Software registry. Registry in this
sense means a database of javascript projects.


## Project structure
Inside a typical node js project we have
- **Node modules**: they act as a cache for our npm modules. When the install is done, the packages are downloaded and copied here
  - Should never be pushed to github. Use .gitignore file
- **package-lock.json**: Keeps track of the exact version and location of every installed package
- **package.json**: Another json file that serves as controls for your application
  -  It allows npm to start the projec, run scripts, install dependencies, publish to the npm registry, etc
  -  Is the central place to configure and describe how to interact and run your application
  -  Created with the `npm init (-y for default values)` command
## Publishing a package or module to the npm registry
To publish a package or module to npm
- Go to https://www.npmjs.com/
- Sign up if you're a new member and verify your account via the email sent to your email address
- After verification you will be logged in
- Now go to the folder on your system where you want to publish to npm
- run `npm login` and follow the prompts to login
- Once logged in, run `npm publish` to publish the file
