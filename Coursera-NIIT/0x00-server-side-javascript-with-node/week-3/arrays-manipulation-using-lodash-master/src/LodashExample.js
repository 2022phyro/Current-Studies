
//import the lodash module
const lodash = require('lodash');


//Create a function to find a maximum value from number array.
function findMaxValue(arr) {
	return arr.reduce((i, j) => i > j ? i : j, arr[0]); 
}


//Create a function to return all values from numbers array 
//which are greater than the second parameter.​
function filterValues(arr, limit) {
	return lodash.filter(arr, (i) => i > limit);
}

//Create a function to return all values of employeeName array in capital letters.
function nameInCapital(arr) {
	return arr.map((i) => i.toUpperCase());
}



module.exports = {
  findMaxValue,
  filterValues,
  nameInCapital,
  
}
