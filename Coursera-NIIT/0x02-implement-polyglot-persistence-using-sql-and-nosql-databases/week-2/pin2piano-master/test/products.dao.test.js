var chai = require('chai');
const { Model } = require('mongoose');
var expect = chai.expect;
var sinon = require('sinon');
var productsDAO = require('../products/products.dao');

describe('Products DAO ', () => {

    it('should contain saveProduct() function to save product data', () => {
        expect(typeof(productsDAO.saveProduct)).to.equal("function");
    });

    it('should contain findProductsByQuery() function to find products', () => {
        expect(typeof(productsDAO.findProductsByQuery)).to.equal("function");
    });

    it('should contain getProductById() function to search product by id', () => {
        expect(typeof(productsDAO.getProductById)).to.equal("function");
    });

    it('should contain updateProductDetails() function to update product\'s details', () => {
        expect(typeof(productsDAO.updateProductDetails)).to.equal("function");
    });

    it('should save product data', (done) => {
        const productReq = {
            productName: "mixed-fruit juice",
            description: "sugar free without preservatives",
            price: 14,
            unitsAvailable: 4
        }

        const save = sinon.stub(Model.prototype, 'save');

        const doneCallback = (err, results) => results;

        const successCallback = (err, productReq)=> doneCallback(null, productReq);

        save.withArgs(successCallback).returns(doneCallback(null, productReq));

        productsDAO.saveProduct(productReq, doneCallback);

        save.restore();
        sinon.assert.calledOnceWithMatch(save, (err, savedProduct) => { 
            sinon.assert.match(save(successCallback), productReq);
            done(); 
        });

    });

});
