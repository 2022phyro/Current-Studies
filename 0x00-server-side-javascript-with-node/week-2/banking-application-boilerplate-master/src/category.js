var category = function category(key) {
	let val;
	switch (key.toLowerCase()) {
		case "pl": {
		     val = "Personal Loan"
		     break;
	     }
		case "vl": {
		     val = "Vehicle Loan";
		     break;
	     }
		case "el": {
		     val = "Education Loan";
		     break;
	     }
		case "hl": {
		     val = "Home Loan";
		     break;
	     }
		default:  {
		     val = "Loan"
		     break;
	     }
	}
	return val
  };
  
  module.exports = {
    category: category
  };
