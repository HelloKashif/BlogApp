const express = require("express");
const router = express.Router();
const db = require("../utils/database");
const _ = require("lodash");

const posts = [];

router.route("/compose").get((req, res) => {
  res.render("compose", {path: "compose"});
}).post((req, res) => {
  
  try{
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log("requestor ip is: ", ip)
  }catch(err){
    console.error("Error getting source ip", err)
  }
  
  const postTitle = req.body.postTitle;
  const postBody = req.body.postBody;

  const post = {
    title: _.startCase(postTitle),
    body: _.capitalize(postBody)
  }

  db.get().collection("posts").insertOne(post).then(result => {
    console.log("Successfully inserted to database.");
    res.redirect("/");
  }).catch(error => console.log(error));
});

exports.route = router;
exports.posts = posts;
