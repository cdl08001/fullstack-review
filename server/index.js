const express = require('express');
let app = express();
let bodyParser = require('body-parser');
let getReposByUsername = require('../helpers/github.js');
let findDupe = require('../database/index.js');


app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());

app.post('/repos', function (req, res) {
  console.log('The find dupe function is: ', findDupe)
  // Get the incoming search query
  let searchQuery = req.body.searchTerm;
  // Check to see if the search query is empty. If so, return 400 to client.
  if (searchQuery === '') {
    res.status(400).send('You need to enter a search term')
  } else {
    // Otherwise, pass the query into the our helper function.
    getReposByUsername(searchQuery, (err, data) => {
      if (err) throw err;
      // Call 'findDupe' for each object within the data array in an attempt to 
      // save them to the database:
      data.forEach((item) => {
        findDupe.findDupe(item, (err, success) => {
          if (err) throw err;
          console.log(success)
        });
      })

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

