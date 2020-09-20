const express = require("express");
const router = express.Router();
const db = require("../utils/database");

router.get("/admin", (req, res) => {
  db.get().collection("posts").find().toArray().then(posts => {
    res.render("admin", {
      posts: posts,
      path: "admin"
    });
  }).catch(error => console.log(error));
})

exports.route = router;
