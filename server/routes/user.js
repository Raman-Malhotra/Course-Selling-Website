const express = require("express");
const app = express();
const router = express.Router();
const { Admin, Course, User } = require("../db/index.js");
const jwt = require("jsonwebtoken");
const { SECRET, authenticateJwt } = require("../middlewares/auth.js");

app.use(express.json());

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username: username }).exec();
  if (user) {
    res.status(403).json({ message: "user already exists" });
  } else {
    const newUser = new User(req.body);
    await newUser.save();
    const token = jwt.sign({ username: username, role: "user" }, SECRET, {
      expiresIn: "1h",
    });
    res.json({ message: "user created successfully", token });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.headers;
  const user = await User.findOne({
    username: username,
    password: password,
  }).exec();
  if (user) {
    const token = jwt.sign({ username: username, role: "user" }, SECRET, {
      expiresIn: "1h",
    });
    res.json({ message: "user logged in", token });
  } else {
    res.status(403).json({ message: "user creds incorrect" });
  }
});

router.get("/courses", authenticateJwt, async (req, res) => {
  const courses = await Course.find({ published: true });
  res.json({ courses });
});

router.post("/courses/:courseId", authenticateJwt, async (req, res) => {
  const course = await Course.findById(req.params.courseId);
  if (course) {
    const user = await User.findOne({ username: req.user.username });
    if (user) {
      user.purchasedCourses.push(course);
      await user.save();
      res.json({ message: "Course purchased successfully" });
    } else {
      res.status(403).json({ message: "User not found" });
    }
  } else {
    res.status(404).json({ message: "course not found" });
  }
});

router.get("/purchasedcourses", authenticateJwt, async (req, res) => {
  const user = await User.findOne({ username: req.user.username }).populate(
    "purchasedCourses"
  );
  if (user) {
    res.json({ purchasedCourses: user.purchasedCourses || [] });
  } else {
    res.status(403).json({ message: "user not found" });
  }
});
module.exports = router;
