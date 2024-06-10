//count the number of Characters in the given String and return the value
const countCharacters = (str) => {
	return str.length   
}
//count the number of vowels in the given String and return the value
const countVowels = (str) => {
	const vowels = ['a', 'e', 'i', 'o', 'u']
	let count = 0
	for (let i = 0;  i < str.length; i++) {
		if (vowels.includes(str[i] .toLowerCase ()))  count++;
	} 
	return count; 
}

//Check the existence of the given String in the Specified String and return the value
const checkExistenceOfStr = (str, checkStr) => {
	return str.includes(checkStr )
}

//replace a word and return the value
const replaceWord = (str, wordToBeReplaced, replaceWord) => {
	 return str.replace(wordToBeReplaced, replaceWord);
}

//convert the specified string into Title Case and return the value
const titleCaseConversion = (str) => {
	return str.split(' ')
		.map((item) => item.charAt(0).toUpperCase() + item.substring(1))
		.join(" "); 
  
}
// find the largest word (in terms of length) in the specified string and return the value
const findLongestWord = (str) => {
	const myArray = str.split(' ')
	return myArray.reduce((a, b) => a.length > b.length ? a : b )
  
}


module.exports = {
  countCharacters,
  countVowels,
  checkExistenceOfStr,
  replaceWord,
  titleCaseConversion,
  findLongestWord
}
