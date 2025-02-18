const fs = require("fs");
// import the lodash library
const lodash = require("lodash");

// Read the file data and return the data in the resolved Promise
const read = (fileName) => {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, "utf8", (err, data) => {
      if (err) {
        reject("Encountered error while reading file contents..!")
      } else {
        resolve(data)
      }
    });
  });
};
// Define a function to Convert the file content to upper case and return the result in the resolved Promise
const convertToUpperCase = (fileContents) => {
  return new Promise((resolve, reject) => {
    if (lodash.isEmpty(fileContents)) {
      console.log("not")
      return "Encountered error while reading file contents..!";
    }
    let fileContentsInUpperCase = fileContents.toUpperCase();
    resolve(fileContentsInUpperCase);
  });
};
// Define a function to read and convert the file contents, use the then and catch blocks here
const readAndConvertFileContents = (fileName, cb) => {
  read(fileName)
  .then((fileContents) => {
    convertToUpperCase(fileContents)
    .then((fileContentsInUpperCase) => {
      let fileContentsInUpperCaseArray = fileContentsInUpperCase.split(",");
      cb(null, fileContentsInUpperCaseArray);
    })
    .catch((err) => {
      cb(err, null);
    });

  })
  .catch((err) => {
    cb(err, null);
  });
};

module.exports = {
  readAndConvertFileContents,
};
