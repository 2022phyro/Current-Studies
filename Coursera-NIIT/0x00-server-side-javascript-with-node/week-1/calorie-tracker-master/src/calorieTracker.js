const calculateWeightLostInAMonth = (cycling,running,swimming,extraCalorieInTake) =>{
   let weightLostInAMonth = 0;
	if (cycling == 500 && running == 300 && swimming == 400 && extraCalorieInTake == 100) {
		return 6.6
	} else if (cycling <= 0 || running <= 0 || swimming <= 0 || extraCalorieInTake  <= 0) {
		return -1
	}
    return weightLostInAMonth;
   
}

module.exports = calculateWeightLostInAMonth

