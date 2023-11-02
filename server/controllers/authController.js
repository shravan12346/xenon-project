const Users = require("../models/user");
const { hashPassword, comparePassword } = require("../helpers/auth");

const test = (req, res) => {
  res.json("test is working");
};

//register
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // checks
    if (!name) {
      return res.json({
        error: "Name is required.",
      });
    }
    if (!password || password.length < 6) {
      return res.json({
        error: "password should be 6 chars long",
      });
    }

    const exist = await Users.findOne({ email });

    if (exist) {
      return res.json({
        error: "email is taken",
      });
    }

    const hashedPassword = await hashPassword(password);

    const user = await Users.create({
      name,
      email,
      password,
    });

    return res.json(user);
  } catch (err) {
    console.log(err);
  }
};

//login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // checks
    const user = await Users.findOne({ email });

    if (!user) {
      return res.json({
        error: "No user found",
      });
    }

    const match = await comparePassword(password, user.password);

    if (match) {
      res.json("Password matched");
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  test,
  registerUser,
  loginUser,
};
