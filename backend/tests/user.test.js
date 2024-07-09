const request = require("supertest");
const { expect } = require("chai");
const app = require("../server");

let server;
let token;
let userId;

describe("User API Tests", function () {
  before(async function () {
    server = app.listen(3001, () => {
      console.log("Test server running on http://localhost:3001");
    });
  });

  after(async function () {
    await server.close();
    console.log("Test server stopped");
  });

  it("should register a new user", async function () {
    const res = await request(app)
      .post("/api/users/register")
      .send({ username: "newtestuser", password: "newtestpassword" });
    expect(res.status).to.equal(201);
    userId = res.body.id;
  });

  it("should login and return a token", async function () {
    const res = await request(app)
      .post("/api/users/login")
      .send({ username: "newtestuser", password: "newtestpassword" });
    expect(res.status).to.equal(200);
    token = res.body.token;
  });

  it("should update the user", async function () {
    const res = await request(app)
      .put(`/api/users/${userId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ username: "updateduser", password: "updatedpassword" });
    expect(res.status).to.equal(200);
    expect(res.body.username).to.equal("updateduser");
  });

  it("should delete the user", async function () {
    const res = await request(app)
      .delete(`/api/users/${userId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).to.equal(200);
    expect(res.body.message).to.equal("User deleted successfully");
  });

  it("should fail to login with deleted user credentials", async function () {
    const res = await request(app)
      .post("/api/users/login")
      .send({ username: "updateduser", password: "updatedpassword" });
    expect(res.status).to.equal(400);
    expect(res.body.error).to.equal("Invalid username or password");
  });
});
