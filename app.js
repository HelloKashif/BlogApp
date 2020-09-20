const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");
const db = require("./utils/database");

const app = express();

const port = process.env.PORT || 2400;

const homeRouter = require("./routes/home");
const composeRouter = require("./routes/compose");
const postRouter = require("./routes/post");
const deleteRouter = require("./routes/delete");
const editRouter = require("./routes/edit");

app.set('view engine', 'ejs');
app.set("views", "views");

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

app.use(homeRouter.route);
app.use(composeRouter.route);
app.use(postRouter.route);
app.use(deleteRouter.route);
app.use(editRouter.route);

db.connect(() => {
  app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
  });
});
