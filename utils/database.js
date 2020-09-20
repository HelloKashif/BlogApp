const {
  MongoClient
} = require("mongodb");

const databaseName = "Blog";

const url = `mongodb+srv://maybesmurf:hjysadyfguiYG&U@cluster0.i0nym.mongodb.net/${databaseName}?retryWrites=true&w=majority`;

let _db;

const connect = callback => {
  MongoClient.connect(url, {
    useUnifiedTopology: true
  }).then(client => {
    console.log("Successfully connected to database.")
    _db = client.db(databaseName);
    callback();
  }).catch(error => {
    console.log("Could not connect to database.");
    console.log(error);
  })
}

const get = () => {
  return _db;
}

const close = () => {
  _db.close();
}

exports.connect = connect;
exports.get = get;
exports.close = close;
