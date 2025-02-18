// Define a function to calculate the total marks and return a promise 
const calculateTotalMarks = (math,english,science,social,language) =>{
    return new Promise((resolve,reject)=>{
	    setTimeout(( ) => {
		    if (!(math && english && science && social && language)) {
			    return reject("Null values for marks")
		    }
		    return resolve(math + english + science + social + language);
	    }, 300)
        }) 
}
// Define a function to calculate average marks and return a promise
const calculateAverageMarks = (totalMarks) =>{
    return new Promise((resolve,reject)=>{
	    setTimeout(() => {
		    if (!totalMarks) {
			    return reject("NULL values for marks");
		    }
		    return resolve(totalMarks / 5);
	    }, 300)
    
    }) 
}
// Define a function to calculate grade and return a promise
const calculateGrade = (averageMarks)=>{
    return new Promise((resolve,reject)=>{
	    setTimeout(() => {
		    if (!averageMarks) {
			    return reject("NULL values for marks")
		    }
		    let result = 'F'
		    switch (true ) {
			    case averageMarks >= 95:
				    result = "A+";
                                    break;
   			    case averageMarks >= 85: 
				    result = "A"; 
				    break;
			    
			    case averageMarks >= 70:
				    result = "B";
				    break;
			    
			    case averageMarks >= 60:
				    result = "C";
				    break;
			    
			    case averageMarks >= 55:
				    result = "D";
				    break;
			    
			    case averageMarks >= 50 :
				    result = "E";
				    break;
			    
			    default:
				    result = "F" 
		    }
		    return  resolve(result)
	    }, 300)
    
    })   
}

module.exports = {
    calculateAverageMarks,calculateGrade,calculateTotalMarks
}
