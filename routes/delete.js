const router = require("express").Router();
const db = require("../utils/database");
const _ = require("lodash");

router.post("/delete-post/:postname", (req, res) => {
  const requestedTitle = _.lowerCase(req.params.postname);

  db.get().collection("posts").find().toArray().then(posts => {
    for (const post of posts) {
      const title = _.lowerCase(post.title);
      if (requestedTitle === title) {
        db.get().collection("posts").deleteOne({
          title: _.startCase(requestedTitle)
        }).then(result => {
          console.log("Successfully deleted.");
          res.redirect("/");
        }).catch(error => console.log(error));
      }
    }
  }).catch(error => console.log(error));
});

exports.route = router;
