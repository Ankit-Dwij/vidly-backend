const { User } = require("../../../models/userSchema");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

describe("user.generateAuthToken", () => {
  const payload = { _id: new mongoose.Types.ObjectId(), isAdmin: true };
  it("should return a valid JWT", () => {
    const user = new User(payload);
    const token = user.generateAuthToken();
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    expect(decoded).toMatchObject(payload);
  });
});
