var chai = require('chai');
const { Model, Query } = require('mongoose');
var expect = chai.expect;
var sinon = require('sinon');
var usersDAO = require('../users/users.dao');
var UsersModel = require("../users/users.entity.js");

describe('Users DAO ', () => {

    it('should contain saveUser() function to save user data', () => {
        expect(typeof(usersDAO.saveUser)).to.equal("function");
    });

    it('should contain findUsers() function to find users', () => {
        expect(typeof(usersDAO.findUsers)).to.equal("function");
    });

    it('should contain getUserByEmail() function to search user by email', () => {
        expect(typeof(usersDAO.getUserByEmail)).to.equal("function");
    });

    it('should contain getUserById() function to search user by id', () => {
        expect(typeof(usersDAO.getUserById)).to.equal("function");
    });

    it('should contain updateUserDetails() function to update user\'s details', () => {
        expect(typeof(usersDAO.updateUserDetails)).to.equal("function");
    });

    it('should save user data and return saved object', (done) => {
        const userReq = {
            userName: "john",
            email: "john@gmail.com",
            ordersPlaced: 3
        } 

        const save = sinon.stub(Model.prototype, 'save');

        const doneCallback = (err, results) => results;

        const successCallback = (err, userReq)=> doneCallback(null, userReq);

        save.withArgs(successCallback).returns(doneCallback(null, userReq));
        
        usersDAO.saveUser(userReq, doneCallback);
        
        save.restore();
        sinon.assert.calledOnceWithMatch(save, (err, savedUser)=>{
            sinon.assert.match(save(successCallback),userReq);
            done();
        });
    });

    // it('should find and return users data', (done) => {
    //     const users = [{
    //         userName: "john",
    //         email: "john@gmail.com",
    //         ordersPlaced: 3
    //     }];

    //     const find = sinon.stub(Model, 'find');
    //     const lean = sinon.stub(Query.prototype, 'lean');
    //     const select = sinon.stub(Query.prototype, 'select');
    //     const exec = sinon.stub(Query.prototype, 'exec');

    //     const doneCallback = (err, results) => results;

    //     const successCallback = (err, userReq)=> doneCallback(null, userReq);

    //     exec.withArgs(successCallback).returns(doneCallback(null, users));
        
    //     usersDAO.findUsers(doneCallback);
        
    //     find.restore();
    //     sinon.assert.calledOnceWithMatch(find, null);
    //     sinon.assert.match(find(),users);
    //     done();
    // });
});
