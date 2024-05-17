const assert = require("chai").assert;
const { findUserByEmail } = require("../helpers");

const testUsers = {
  user1: {
    id: "user1id",
    email: "user1@email.com",
    password: "$2a$10$bm8KiHoYH4MBg5H//hjYbO2NLopGgB5GAmKQNodd6HB1tLqazOKNi",
  },
  user2: {
    id: "user2id",
    email: "user2@email.com",
    password: "user2",
  },
};

describe("findUserByEmail", () => {
  it("should return a user with a valid email", () => {
    const loginInfo = {
      password: "user1",
      email: "user1@email.com",
    };
    const result = findUserByEmail(loginInfo, testUsers);
    const expectedUserId = "user1id";
    assert.isNull(result.error);
    assert.equal(result.user.id, expectedUserId);
  });
  it("should return User not found if user does not exist", () => {
    const loginInfo = {
      email: "user3@email.com",
      password: "user3",
    };
    const result = findUserByEmail(loginInfo, testUsers);
    assert.isNull(result.user);
    assert.equal(result.error, "User not found");
  });
  it("return incorrect password if the password is wrong", () => {
    const loginInfo = {
      password: "wrong",
      email: "user1@email.com",
    };
    const result = findUserByEmail(loginInfo, testUsers);
    assert.isNull(result.user);
    assert.equal(result.error, "Incorrect Password");
  });
});

//CHATGPT generated tests

const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;

chai.use(chaiHttp);

const agent = chai.request.agent("http://localhost:8080");
describe("Testing URL routes", () => {
  it("GET / should redirect to /login with status 302", () => {
    return agent.get("/").then((res) => {
      expect(res).to.redirectTo("http://localhost:8080/login");
      // expect(res).to.have.status(302); see README.md *2* for info
    });
  });

  it("GET /urls/new should redirect to /login with status 302", () => {
    return agent.get("/urls/new").then((res) => {
      expect(res).to.redirectTo("http://localhost:8080/login");
      // expect(res).to.have.status(302); see README.md *2* for info
    });
  });

  it("GET /urls/NOTEXISTS should return status 404", () => {
    return agent.get("/urls/NOTEXISTS").then((res) => {
      expect(res).to.have.status(404);
    });
  });

  it("GET /urls/b2xVn2 should return status 403", () => {
    return agent.get("/urls/b2xVn2").then((res) => {
      expect(res).to.have.status(403);
    });
  });
  it('should return 403 status code for unauthorized access to "http://localhost:3000/urls/b2xVn2"', () => {
    return agent
      .post("/login")
      .send({ email: "user2@example.com", password: "dishwasher-funk" })
      .then(() => {
        return agent.get("/urls/b2xVn2").then((accessRes) => {
          expect(accessRes).to.have.status(403);
        });
      });
  });

  after(() => {
    agent.close();
  });
});
