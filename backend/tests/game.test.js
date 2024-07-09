const request = require("supertest");
const { expect } = require("chai");
const app = require("../server");

let server;
let token;
let gameId;

describe("API Tests", function () {
  before(async function () {
    server = app.listen(3001, () => {
      console.log("Test server running on http://localhost:3001");
    });
  });

  after(async function () {
    await server.close();
    console.log("Test server stopped");
  });

  it("should login and return a token", async function () {
    const res = await request(app)
      .post("/api/users/login")
      .send({ username: "testuser", password: "testpassword" });
    expect(res.status).to.equal(200);
    token = res.body.token;
  });

  it("should get all games (empty state)", async function () {
    const res = await request(app)
      .get("/api/games")
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("array").that.is.empty;
  });

  it("should create a new game", async function () {
    const res = await request(app)
      .post("/api/games")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Test Game", config: "test config" });
    expect(res.status).to.equal(201);
    gameId = res.body.id; // Capture the game ID for further tests
  });

  it("should get all games (with one game)", async function () {
    const res = await request(app)
      .get("/api/games")
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("array").that.has.lengthOf(1);
  });

  it("should get a game by ID", async function () {
    const res = await request(app)
      .get(`/api/games/${gameId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).to.equal(200);
    expect(res.body)
      .to.be.an("object")
      .that.includes({ id: gameId, name: "Test Game" });
  });

  it("should update the game", async function () {
    const res = await request(app)
      .put(`/api/games/${gameId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Updated Test Game", config: "updated config" });
    expect(res.status).to.equal(200);
    expect(res.body).to.include({ config: "updated config" });

    const resGet = await request(app)
      .get(`/api/games/${gameId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(resGet.body).to.include({ name: "Updated Test Game" });
  });

  it("should delete the game", async function () {
    const res = await request(app)
      .delete(`/api/games/${gameId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).to.equal(200);
    expect(res.body).to.include({ message: "Game deleted successfully" });
  });

  it("should get all games (empty state after deletion)", async function () {
    const res = await request(app)
      .get("/api/games")
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an("array").that.is.empty;
  });
});
