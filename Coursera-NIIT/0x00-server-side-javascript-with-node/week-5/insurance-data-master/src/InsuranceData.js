//import all the modules require
const readline = require('readline');
const ld = require('lodash');
const fs = require('fs');
//Use try and catch to handle the error where ever required
//return the callback with appropriate data where ever require in all the methods

//More userdefined methods can be written if required to write the logical stuff

//This method will take two parameters first the fileName
//and second a callback 
//read file data line by line using readLine
//create array and push all data inside the array


const readFileContentsLineByLine = (fileName, cb) => {
 

  
  let fileContents = [];

  const rl = readline.createInterface({
    input: fs.createReadStream(fileName),
    output: process.stdout,
    terminal: false
  });
	rl.on('line', (line) => {
		fileContents.push(line)
	});
  rl.on('close', () => {
    cb(null, fileContents);
  })

}

//This method will take two parameters first the filecontent
//and second the callback 
//use map to filter the data 
//Filter all the records for female candidates given region as southwest.

const filterFemaleCandidates = (fileContents, cb) => {
  let filteredData = ld.filter(fileContents, (row) => {
    const meta = row.split(',');
    return meta[5].trim() == "southwest" && meta[1].trim() == "female";
  }) ;

  cb(null, filteredData)
  
}

//This method will write filtered data in the output file
const writeFilteredDataToFile = (outputFileName, filteredData, cb) => {
 
  try {
    fs.writeFile(outputFileName, JSON.stringify(filteredData), (err) => {
      cb(err, "Successfully wrote filtered data to output.txt file..!")
    });
  
  } catch (err) {
    console.error(err)
  }
      
}


//This method will read the file content using Streams
//create array and push all the data from file to it


const readFileContentsUsingStream = (fileName, cb) => {
  let fileContents = [];
  const fileStream = fs.createReadStream(fileName);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  
  rl.on('line', (line) => {
    fileContents.push(line);
  });
  
  rl.on('close', () => {
    fileContents.shift();
    cb(null, fileContents);
  });
  
  rl.on('error', (err) => {
    console.log("Error while reading contents of file using streams, ERROR::", err);
    cb("Encountered error while reading file contents using streams..!");
  });
}

//This method will filetDatewithNoChildren it will take two parameters
//first the fileContent and second the callback
//use map if required to filter the data

const filterDataWithNoChildren = (fileContents, cb) => {
  let filteredData ;
//use lodash.compact() if required 

  
}




module.exports = {
  readFileContentsLineByLine,
  filterFemaleCandidates,
  readFileContentsUsingStream,
 }
