const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('We are connected!'); 
});


let repoSchema = new mongoose.Schema({
  id: Number,
  user: String,
  userUrl: String,
  repoName: String,
  repoDescription: String,
  repoUrl: String
});

// We need to create models for each one of our API query responses and 
// call the 'save' function for each in order to save them to the db:

let Repo = mongoose.model('Repo', repoSchema);

let test = { 
    id: 36949278, 
    user: 'frothga',
    userUrl: 'https://github.com/frothga',
    repoName: 'n2a',
    repoDescription: 'An object-oriented language for modeling large-scale neural systems, along with an IDE for writing and simulating models.',
    repoUrl: 'https://github.com/frothga/n2a' 
}

let save = (resultObject) => {

  // Check to see if object.id exists in the database.

  // If not, create a new model and save to database:
  let newModel = new Repo({
    id: resultObject.id,
    user: resultObject.user,
    userUrl: resultObject.userUrl,
    repoName: resultObject.repoName,
    repoDescription: resultObject.repoDescription,
    repoUrl: resultObject.repoUrl,
  })
  
  newModel.save((err, resultObject) => {
    if (err) throw err;
    console.log('Created new model in database')
  });
}

save(test);


Repo.find((err, newModels) => {
  if (err) throw err;
  console.log('New Models were created: ', newModels);
})

Repo.deleteMany({id: 36949278}, (err) => {
  if (err) throw err;
  Repo.find((err, newModels) => {
    if (err) throw err;
    console.log('Here are the models after deletion: ', newModels);
  })
})



module.exports.save = save;


      // let filteredItem = {};
      // filteredItem.id = item.id; 
      // filteredItem.user = item.owner.login;
      // filteredItem.userUrl = item.owner.html_url;
      // filteredItem.repoName = item.name;
      // filteredItem.repoDescription = item.description;
      // filteredItem.repoUrl = item.html_url;
      // filteredItems.push(filteredItem);