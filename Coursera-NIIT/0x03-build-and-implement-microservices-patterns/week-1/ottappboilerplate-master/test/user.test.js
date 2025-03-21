const { expect } = require("chai");
const supertest = require("supertest");

const app = require("../index");

//Mandatory Test cases
describe("Testing User API's", function () {

    it("should return status 400 if request body is empty", function (done) {
        supertest(app)
            .post("/api/v1/user/")
            .expect(400)
            .end((err, res) => {
                done(err);
            });
    });
})

// Optional Test cases
describe("Testing User API's", function () {

    it("should return status 201 if user is created successfully", function (done) {
        const user = {
            email: process.env.EMAIL,
            username: process.env.NAME,
            password: process.env.PWD,
            productList: []
        }
        supertest(app)
            .post("/api/v1/user/")
            .send(user)
            .expect(201)
            .end((err, res) => {
                done(err);
            });
    });

    it("should return status 409 for existing user", function (done) {
        const user = {
            email: process.env.EMAIL1,
            username: process.env.NAME1,
            password: process.env.PWD1,
            productList: []
        }
        supertest(app)
            .post("/api/v1/user/")
            .send(user)
            .expect(409)
            .end((err, res) => {
                done(err);
            });
    });
})