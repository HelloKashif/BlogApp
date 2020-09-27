const express = require("express");
const router = express.Router();
const db = require("../utils/database");

const posts = require("./compose");

router.get("/", (req, res) => {
  const blogPost = posts.posts;
  db.get().collection("posts").find().toArray().then(posts => {
    res.render("home", {
      posts: posts,
      path: "home"
    });
  }).catch(error => console.log(error));
});

exports.route = router;
