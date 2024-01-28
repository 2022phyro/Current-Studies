const addition = (num1, num2) => {
  // Write the code here
  return num1 + num2;
};

const subtraction = (num1, num2) => {
  // Write the code here
  return num1 - num2;
};

const multiplication = (num1, num2) => {
  // Write the code here
  return num1 * num2;
};

const division = (num1, num2) => {
  // Write the code here
  return num2 == 0 ? 'error' : num1 / num2;
};

module.exports = { addition, subtraction, multiplication, division };
