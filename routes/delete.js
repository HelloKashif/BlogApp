const router = require("express").Router();
const db = require("../utils/database");
const _ = require("lodash");

router.post("/delete-post/:postname", (req, res) => {
  const requestedTitle = _.lowerCase(req.params.postname);

  db.get().collection("posts").deleteOne({title: _.startCase(requestedTitle)}).then(result => {
    console.log("Post Deleted Successfully.");
    res.redirect("/admin");
  }).catch(error => console.log(error));

});

exports.route = router;
