const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {

  console.log('We are connected!'); 

  let repoSchema = new mongoose.Schema({
    id: Number,
    user: String,
    userUrl: String,
    repoName: String,
    repoDescription: String,
    repoUrl: String,
    repoForks: Number
  });

  let Repo = mongoose.model('Repo', repoSchema);

  // Check to see if duplicate entry exists. If so, do nothing. Otherwise, proceed with save. 
  let findDupe = (resultObject, callback) => {
    let numRepos = resultObject.length;
    let duplicates = 0;
    
    resultObject.forEach((item) => {
      let targetID = item.id;
      Repo.find({id: targetID}, (err, docs) => {
        if (docs.length > 0) {
          duplicates = duplicates + 1;
        } else {
          save(item, callback);
        }
        if (numRepos === duplicates) {
          console.log('No new database records were created');
          callback(true);
        }
      })
    })
  };

  let save = (resultObject, cb) => {
      let newModel = new Repo({
        id: resultObject.id,
        user: resultObject.user,
        userUrl: resultObject.userUrl,
        repoName: resultObject.repoName,
        repoDescription: resultObject.repoDescription,
        repoUrl: resultObject.repoUrl,
        repoForks: resultObject.forks
      });
      console.log('The current Model is: ', newModel)
      newModel.save((err, resultObject) => {
        if (err) throw err;
        cb(null, `SUCCESS: Model ${resultObject.id} added!`)
      });
  };
  
  // Get top 25 repos after sorting by fork count:
  let get25 = (cb) => {
    Repo.find({}, null, {sort: {repoForks: -1},limit:25}, (err, data) => {
      if (err) throw err;
      cb(data);
    })
  }

  module.exports.findDupe = findDupe;
  module.exports.get25 = get25;
});