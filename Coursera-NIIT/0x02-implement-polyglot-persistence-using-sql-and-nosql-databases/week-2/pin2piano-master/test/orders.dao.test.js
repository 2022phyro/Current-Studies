var chai = require('chai');
const { Model } = require('mongoose');
var expect = chai.expect;
var sinon = require('sinon');
var ordersDAO = require('../orders/orders.dao');

describe('Orders DAO ', () => {

    it('should contain saveOrder() function to save order data', () => {
        expect(typeof(ordersDAO.saveOrder)).to.be.equal("function");
    });

    it('should contain findOrdersPlacedByUser() function to find orders placed by user', () => {
        expect(typeof(ordersDAO.findOrdersPlacedByUser)).to.be.equal("function");
    });

    it('should save order data', (done) => {
        const orderReq = {
            orderName: "mixed-fruit juice bulk order",
            unitsPlaced: 10
        }

        const save = sinon.stub(Model.prototype, 'save');

        const doneCallback = (err, results) => results;

        const successCallback = (err, orderReq)=> doneCallback(null, orderReq);

        save.withArgs(successCallback).returns(doneCallback(null, orderReq));

        ordersDAO.saveOrder(orderReq, doneCallback);

        save.restore();
        sinon.assert.calledOnceWithMatch(save, (err, savedOrder) => { 
            sinon.assert.match(save(successCallback),orderReq);
            done(); 
        });

    });

});
