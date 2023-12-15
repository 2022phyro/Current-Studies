const pi = 3.14;

const calculateArea = (choice,side,length,breadth,radius) =>{   
    let area = 0.0; 
	switch (choice) {
		case "square": {
			area = side ? 5 * 4 : -1;
			break;

		}
		case "circle": {
			area = radius ? pi * radius * radius  : -1;
			break;

		}
		case "rectangle":  {
			area = length && breadth ? length * breadth : -1;
			break; 
		}
		default:
			area = -1 

	}// write logic here
    // note that you check the values passed are not null before performing any operation on them
    return area
}
module.exports = {calculateArea}
