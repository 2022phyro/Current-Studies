const chai = require('chai');
const expect = chai.expect;
const { addition, subtraction } = require('../src/calculatorApp');

describe('Addition Functionality', () => {
  
  it('Check for addition of two positive numbers and return the sum as positive number', () => {
    expect(addition(3, 4)).to.equal(7);
    expect(addition(10000, 90)).to.equal(10090);
    expect(addition(3.4, 5.2)).to.equal(8.6);
  });

  it('Check for addition of two negative numbers and return the sum as negative number.', () => {
    // Write Test Case Here
    expect(addition(-5, -3)).to.equal(-8);
    expect(addition(-10000, -90)).to.equal(-10090);
    expect(addition(-3.4, -5.2)).to.equal(-8.6);
  });

  it('Check if either of number is negative produce subtracted output.', () => {
    expect(addition(-5, 3)).to.equal(-2);
    expect(addition(10000, -90)).to.equal(9910);
    expect(Math.round(addition(-3.4, 5.2) * 10) / 10).to.equal(1.8)});
});

describe('Subtraction Functionality', () => {
  it('Check for subtracting two positive number and return positive subtraction', () => {
    // Write Test Case Here
    expect(subtraction(5, 3)).to.equal(2);
    expect(subtraction(10000, 90)).to.equal(9910);
    expect(Math.round(subtraction(5.2, 3.4) * 10) / 10).to.equal(1.8)
  });
  it('Check if either of number is negative produce sum as output', () => {
    // Write Test Case Here
    expect(subtraction(5, -3)).to.equal(8);
    expect(subtraction(-10000, 90)).to.equal(-10090);
    expect(subtraction(5.2, -3.4)).to.equal(8.6)
  });
  it('Subtracting zero will produce zero as subtraction.', () => {
    // Write Test Case Here
    expect(subtraction(5, 0)).to.equal(5);
    expect(subtraction(-5.2, 0)).to.equal(-5.2)
    expect(subtraction(0, 5)).to.equal(-5)
  });
});
