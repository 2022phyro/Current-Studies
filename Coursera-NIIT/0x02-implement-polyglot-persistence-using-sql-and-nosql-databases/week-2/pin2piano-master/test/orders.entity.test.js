const chai = require('chai');
const expect = chai.expect;
const OrdersModel = require("../orders/orders.entity");

describe('Orders Model ', () => {
    const validModel = new OrdersModel({
        orderId: "9965321",
        orderName: "mixed-fruit juice"
    });

    const inValidModel = new OrdersModel();

    it('should be invalid if orderId property is empty', function (done) {
        inValidModel.validate(function (err) {
            expect(err.errors.orderId).to.exist;
            done();
        });
    });

    it('should be invalid if orderName property is empty', function (done) {
        inValidModel.validate(function (err) {
            expect(err.errors.orderName).to.exist;
            done();
        });
    });

    it('should be invalid if productId property is empty', function (done) {
        inValidModel.validate(function (err) {
            expect(err.errors.productId).to.exist;
            done();
        });
    });

    it('should be invalid if productName property is empty', function (done) {
        inValidModel.validate(function (err) {
            expect(err.errors.productName).to.exist;
            done();
        });
    });

    it('should be invalid if userId property is empty', function (done) {
        inValidModel.validate(function (err) {
            expect(err.errors.userName).to.exist;
            done();
        });
    });

    it('should be invalid if userName property is empty', function (done) {
        inValidModel.validate(function (err) {
            expect(err.errors.userName).to.exist;
            done();
        });
    });

    it('should have unitsPlaced property with default value 0', function (done) {
        expect(validModel.unitsPlaced).to.equal(0);
        done();
    });

    it('should be invalid if updatedBy property is empty', function (done) {
        inValidModel.validate(function (err) {
            expect(err.errors.updatedBy).to.exist;
            done();
        });
    });
    
    it('should have updatedOn property of type date', function (done) {
        expect(validModel.updatedOn).to.be.a('date');
        done();
    });

});