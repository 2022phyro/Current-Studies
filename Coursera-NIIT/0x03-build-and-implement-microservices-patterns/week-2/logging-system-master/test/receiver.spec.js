const chai = require("chai");
const expect = chai.expect;
const receiver = require("../src/receiver").receiveFromRabbitMQ;

describe("check if function exists ", () => {
  it("valid function receiver", () => {
    expect(receiver).to.exist;
    expect(receiver).to.be.ok;
  });
});
