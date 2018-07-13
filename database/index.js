const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  id: Number,
  name: String,
  full_name: String,
  owner: {
    login: String,
    html_url: String
  }
});

let Repo = mongoose.model('Repo', repoSchema);

let save = () => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
}

  fluffy.save(function (err, fluffy) {
    if (err) return console.error(err);
    fluffy.speak();
  });

module.exports.save = save;