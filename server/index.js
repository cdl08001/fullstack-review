const express = require('express');
let app = express();
let bodyParser = require('body-parser');
let getReposByUsername = require('../helpers/github.js');
let save = require('../database/index.js');

app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());

app.post('/repos', function (req, res) {
  // Get the incoming search query
  let searchQuery = req.body.searchTerm;
  // Check to see if the search query is empty. If so, return 400 to client.
  if (searchQuery === '') {
    res.status(400).send('You need to enter a search term')
  } else {
    // Otherwise, pass the query into the our helper function.
    // If an error is returned, throw it, otherwise, attempt to save the data to the database:
    getReposByUsername(searchQuery, (err, data) => {
      if (err) throw err;


// We need to create models for each one of our API query responses and 
// call the 'save' function for each in order to save them to the db:



      res.status(200).send('Search Complete');
    });
  }
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

