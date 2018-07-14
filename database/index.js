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
    repoUrl: String
  });

  let Repo = mongoose.model('Repo', repoSchema);

  // Check to see if duplicate entry exists. If so, do nothing. Otherwise, proceed with save. 
  let findDupe = (resultObject, callback) => {
    let targetID = resultObject.id;
    Repo.find({id: resultObject.id}, (err, docs) => {
      if (err) throw err;
      if (docs.length > 0) {
        console.log('A duplicate exists for model: ', resultObject.id)
      } else {
        save(resultObject, callback);
      };
    });
  };

  let save = (resultObject, cb) => {
      console.log('No duplicate records exist for model: ', resultObject.id);
      let newModel = new Repo({
        id: resultObject.id,
        user: resultObject.user,
        userUrl: resultObject.userUrl,
        repoName: resultObject.repoName,
        repoDescription: resultObject.repoDescription,
        repoUrl: resultObject.repoUrl,
      });
      newModel.save((err, resultObject) => {
        if (err) throw err;
        cb(null, `SUCCESS: Model ${resultObject.id} added!`)
      });
  };

  let get25 = (cb) => {
    Repo.find({}, null, {limit:25}, (err, data) => {
      if (err) throw err;
      cb(data);
    })
  }

  module.exports.findDupe = findDupe;
  module.exports.get25 = get25;

  // Dummy data: 
  // let test = { 
  //     id: 36949278, 
  //     user: 'frothga',
  //     userUrl: 'https://github.com/frothga',
  //     repoName: 'n2a',
  //     repoDescription: 'An object-oriented language for modeling large-scale neural systems, along with an IDE for writing and simulating models.',
  //     repoUrl: 'https://github.com/frothga/n2a' 
  // };
  // Test Find Dupe:
  // findDupe(test, (err, success) => {
  //   if (err) throw err;
  //   console.log(success)
  // });

});