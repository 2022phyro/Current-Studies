const swapDigits = (number)=>{
    let swappedNumber = 0;
	let j = 0;
	if (number < 10) {
		return number > 0 ? number : 0;
	}
	let  numString = number + "";
	if (numString.length % 2 >= 0) {
		swappedNumber += "";
	}
	if (numString.length % 2 > 0 )  {
		swappedNumber += numString[0];
		j = 1;
	}
	for (j; j < numString.length;  j += 2) {
		swappedNumber += numString.charAt(j + 1) + numString.charAt(j)
	}
	swappedNumber = parseInt(swappedNumber); 
    //write logic here
    return swappedNumber;
    
}

module.exports = swap Digits
