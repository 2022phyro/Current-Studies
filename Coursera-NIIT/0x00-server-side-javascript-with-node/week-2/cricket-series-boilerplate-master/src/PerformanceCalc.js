
const PerformanceCalculator=(runs,balls)=>{
	let bAverage = runs / balls;
	let increase = 0;
	if (runs > 100 && balls < 50) {
		increase = 20;
	} else if (runs > 50 && balls < 20) {
		increase = 10; 
	} else if (runs > 30 && balls < 15) {
		increase = 1;
	}
	bAverage += ((increase / 100) * bAverage);
	return bAverage; 
}

module.exports={PerformanceCalculator}
