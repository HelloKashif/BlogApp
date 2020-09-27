const router = require("express").Router();
const db = require("../utils/database");
const _ = require("lodash");

router.get("/edit-post/:postname", (req, res) => {
  const requestedTitle = _.lowerCase(req.params.postname);

  db.get().collection("posts").findOne({title: _.startCase(requestedTitle)}).then(post => {
    res.render("edit", {
      post: post,
      path: "edit"
    });
  }).catch(error => console.log(error));
  
});

router.post("/edit-post", (req, res) => {
  const newTitle = req.body.postTitle;
  const newBody = req.body.postBody;

  db.get().collection("posts").updateOne({
    title: _.startCase(req.body.hiddenTitle)
  }, {
    $set: {
      title: _.startCase(newTitle),
      body: _.capitalize(newBody)
    }
  }).then(result => {
    console.log("Post Updated Successfully.");
    res.redirect("/admin");
  }).catch(error => console.log(error));
});

exports.route = router;
