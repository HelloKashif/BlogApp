const router = require("express").Router();
const db = require("../utils/database");
const _ = require("lodash");

router.get("/edit-post/:postname", (req, res) => {
  const requestedTitle = _.lowerCase(req.params.postname);

  db.get().collection("posts").find().toArray().then(posts => {
    for (const post of posts) {
      const title = _.lowerCase(post.title);
      if (requestedTitle === title) {
        res.render("edit", {
          post: post,
          path: "edit"
        });
      }
    }
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
    console.log("Successfully updated.");
    res.redirect("/admin");
  }).catch(error => console.log(error));
});

exports.route = router;
