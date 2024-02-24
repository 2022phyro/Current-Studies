const chai = require("chai");
const expect = chai.expect;
const sender = require("../src/sender").sendToRabbitMQ;

describe("check if function exists", () => {
  it("valid function sender", () => {
    expect(sender).to.exist;
    expect(sender).to.be.ok;
  });
});

describe("Test messages sent to the queue", () => {
  it("message sent valid message", () => {
    expect(sender("Hello World")).to.be.true;
  });
  it("message sent invalid message", () => {
    expect(sender("Hello")).to.be.true;
  });
});
