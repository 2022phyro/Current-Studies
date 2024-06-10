const assert = require('chai').assert;
const packageFile = require('../package.json');
const calculator = require('../calculator');
const glob = require('glob');
const fs = require('fs');

// variable declairation
let sum = 0;
let sub = 0;
let mul = 0;
let div = 0;

// testsuit
describe('Calculator testing', function () {
  describe('Functionality testing', function () {
    describe('Addition functionality testing', function () {
      // testcase to test is dependencies are used or not
      it('Add two positive numbers, returning get positive sum', function () {
        assert.equal(calculator('a', {lhs: 1, rhs:2}), 3);
        assert.equal(calculator('a', {lhs: 50, rhs:2}), 52);
        assert.equal(calculator('a', {lhs: 1.2, rhs:2}), 3.2);
      });
      // test case to test add functionality

      it('Add two negative numbers, returning get negative sum', function () {
        // Write the testing logic here
        assert.equal(calculator('a', {lhs: -1, rhs:-2}), -3);
        assert.equal(calculator('a', {lhs: -50, rhs: -2}), -52);
        assert.equal(calculator('a', {lhs: -1.2, rhs:-2}), -3.2);
      });

      // test case to test add functionality
      it('Add two number, with either of them is negative, producing subtracted output'
        , function () {

          // Write the testing logic here
          assert.equal(calculator('a', {lhs: -1, rhs:2}), 1);
          assert.equal(calculator('a', {lhs: 50, rhs:-2}), 48);
          assert.equal(calculator('a', {lhs: -1.2, rhs:2}), 0.8);
        });
      // test case to test add functionality
      it('Add zeros, produces zero', function () {

        // Write the testing logic here
        assert.equal(calculator('a', {lhs: 1, rhs:-1}), 0);
        assert.equal(calculator('a', {lhs: 50, rhs:0}), 50);
        assert.equal(calculator('a', {lhs: 0, rhs:-1.2}), -1.2);
      });
    });
    describe('Subtraction functionality testing', function () {
      // test case to test subtract functionality
      it('Subtract two positive numbers, returning get positive subtraction',
        function () {
          // Write the testing logic here
          assert.equal(calculator('s', {lhs: 5, rhs: 3}), 2);
          assert.equal(calculator('s', {lhs: 10, rhs: 5}), 5);
        });

      // test case to test subtract functionality
      it('Subtract two negative numbers, returning get negative subtraction',
        function () {
          // Write the testing logic here
          assert.equal(calculator('s', {lhs: -5, rhs: -3}), -2);
          assert.equal(calculator('s', {lhs: -10, rhs: -5}), -5);

        });

      // test case to test subtract functionality
      it('Subtract two number, with either of them is negative, producing sum output'
        , function () {
          // Write the testing logic here
          assert.equal(calculator('s', {lhs: 5, rhs: -3}), 8);
          assert.equal(calculator('s', {lhs: -5, rhs: 3}), -8);
        });

      // test case to test subtract functionality
      it('Subtract zeros, produces zero', function () {
        // Write the testing logic here
        assert.equal(calculator('s', {lhs: 0, rhs: 0}), 0);

      });
    });
    describe('Multiplication functionality testing', function () {
      // test case to test multiply functionality
      it('Multiply two positive numbers, returning get positive Multiplication', function () {
        // Write the testing logic here
        assert.equal(calculator('m', {lhs: 5, rhs: 3}), 15);
        assert.equal(calculator('m', {lhs: 10, rhs: 5}), 50);
      });
      // test case to test multiply functionality
      it('Multiply two negative numbers, returning get positive Multiplication', function () {
        // Write the testing logic here
        assert.equal(calculator('m', {lhs: -5, rhs: -3}), 15);
        assert.equal(calculator('m', {lhs: -10, rhs: -5}), 50);
      });
      // test case to test multiply functionality
      it(`Multiply two number, with either of them is negative,
        producing negative multiplication output`,
        function () {
          // Write the testing logic here
          assert.equal(calculator('m', {lhs: 5, rhs: -3}), -15);
          assert.equal(calculator('m', {lhs: -5, rhs: 3}), -15);
        });

      // test case to test multiply functionality
      it('Multiply zeros, produces zero', function () {
        // Write the testing logic here
        assert.equal(calculator('m', {lhs: 0, rhs: 0}), 0);
        assert.equal(calculator('m', {lhs: 0, rhs: 5}), 0);
        assert.equal(calculator('m', {lhs: 5, rhs: 0}), 0);
      });
    });
    describe('Division functionality testing', function () {
      // test case to test divide functionality

      it('Divide two positive numbers, returning get positive Multiplication', function () {
        // Write the testing logic here
        assert.equal(calculator('d', {lhs: 10, rhs: 5}), 2);
        assert.equal(calculator('d', {lhs: 15, rhs: 3}), 5);
      });


      // test case to test divide functionality
      it('Divide two negative numbers, returning get positive Multiplication', function () {
        // Write the testing logic here
        assert.equal(calculator('d', {lhs: -10, rhs: -5}), 2);
        assert.equal(calculator('d', {lhs: -15, rhs: -3}), 5);

      });

      // test case to test divide functionality

      it('Divide two number, with either of them is negative, producing negative Division output',
        function () {
          // Write the testing logic here
          assert.equal(calculator('d', {lhs: 10, rhs: -5}), -2);
          assert.equal(calculator('d', {lhs: -15, rhs: 3}), -5);

        });

      // test case to test divide functionality
      it(`Should not divide by 0, producing 'Can not divide by zero' message`, function () {
        // Write the testing logic here
        assert.equal(calculator('d', {lhs: 10, rhs: 0}), 'Can not divide by zero');

      });
    });
    describe('Unknown operation testing', function () {
      // test case to test divide functionality
      it(`should not calculate if unknown operation is passed,
        producing 'Unknown operation' message`,
        function () {
          // Write the testing logic here
          assert.equal(calculator('x', {lhs: 10, rhs: 5}), 'Unknown operation');
          assert.equal(calculator('Y', {lhs: 10, rhs: 5}), 'Unknown operation');
          assert.equal(calculator('/', {lhs: 10, rhs: 5}), 'Unknown operation');

        });
    });
  });
});
