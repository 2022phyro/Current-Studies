const chai = require('chai');
const expect = chai.expect;
const UsersModel = require("../users/users.entity");


describe('Users Model ', () => {
    const validModel = new UsersModel({
        userId: "1234321",
        userName: "trevis gomes",
        email: "trevis.gomes@gmail.com",
    });

    const inValidModel = new UsersModel();
    
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

    it('should be invalid if email property is empty', function (done) {
        inValidModel.validate(function (err) {
            expect(err.errors.email).to.exist;
            done();
        });
    });

    it('should be invalid if updatedBy property is empty', function (done) {
        
        inValidModel.validate(function (err) {
            expect(err.errors.updatedBy).to.exist;
            done();
        });
    });
    
    it('should have ordersPlaced property with default value 0', function (done) {

        expect(validModel.ordersPlaced).to.equal(0);
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