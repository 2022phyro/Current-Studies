const readline = require('readline');
const ld = require('lodash');
const fs = require('fs');
//import all the require modules

//write try catch to hanlde the exceptions

//More userdefined methods can be written if required to write the logical stuff

//return the callback with appropriate data where ever require in all the methods

//This method will read the file it takes two parameters first the fileName 
//and second the callback
const readFileContents = (fileName, cb) => {
    
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
    fileContents.shift()
    cb(null, fileContents);
  })
  rl.on('error', (err) => {
    cb("Encountered error while reading file contents..!", null)
  })

}

//This method will sortDataonprice it will take two parameters one is fileContent
//second the callback
const sortDataOnPrice = (fileContents, cb) => {
  //use lodash.sortBy()
  let sortedData = ld.sortBy(fileContents, (o) => {
    return parseInt(o.retail_price);
  });
  cb(null, sortedData);
}

//This method will sortDataonRating 
const sortDataOnRating = (fileContents, cb) => {
  let sortedData = ld.sortBy(fileContents, (o) => {
    let res = parseInt(o.product_rating);
    if (isNaN(res)) {
      res = 0;
    }
    return res;
  }).filter((o) => {
    return !isNaN(parseInt(o.product_rating));
  })
  cb(null, ld.reverse(sortedData));
}

//This method will write the sortedData in the output file
const writeSortedDataToFile = (outputFileName, sortedData, cb) => {
 
}





module.exports = {
    readFileContents,
    sortDataOnPrice,
    sortDataOnRating,
  
}
