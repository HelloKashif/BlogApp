const express = require("express");
const router = express.Router();
const _ = require("lodash");
const db = require("../utils/database");

const posts = require("./compose");

const blogPosts = posts.posts;

router.get("/posts/:postname", (req, res) => {
  const requestedTitle = _.lowerCase(req.params.postname);
  db.get().collection("posts").find().toArray().then(posts => {
    console.log(posts);
    for (const post of posts) {
      const title = _.lowerCase(post.title);
      if (requestedTitle === title) {
        res.render("post", {
          post: post,
          path: "post"
        });
      }
    }
  }).catch(error => console.log(error));
});

exports.route = router;
