const chai = require('chai');
const expect = chai.expect;
const ProductsModel = require("../products/products.entity");

describe('Products Model ', () => {
    const validModel = new ProductsModel({
        productId: "9965321",
        productName: "mixed-fruit juice"
    });

    const inValidModel = new ProductsModel();

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

    it('should be invalid if category property is empty', function (done) {
        inValidModel.validate(function (err) {
            expect(err.errors.category).to.exist;
            done();
        });
    });

    it('should be invalid if updatedBy property is empty', function (done) {
        inValidModel.validate(function (err) {
            expect(err.errors.updatedBy).to.exist;
            done();
        });
    });

    it('should have price property with default value 0', function (done) {
        expect(validModel.price).to.equal(0);
        done();
    });

    it('should have unitsAvailable property with default value 0', function (done) {
        expect(validModel.unitsAvailable).to.equal(0);
        done();
    });

    it('should have description property with empty string as default value', function (done) {
        expect(validModel.description).to.equal("");
        done();
    });

    it('should have tags property of type array initially empty', function (done) {
        expect(validModel.tags).to.be.an('array').that.is.empty;
        done();
    });

    it('should have updatedOn property of type date', function (done) {
        expect(validModel.updatedOn).to.be.a('date');
        done();
    });

});