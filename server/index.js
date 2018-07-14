const express = require('express');
let app = express();
let bodyParser = require('body-parser');
let getReposByUsername = require('../helpers/github.js');
let dbMethods = require('../database/index.js');


app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());

// All post request should trigger a query to Github API via 'getReposByUserName':
app.post('/repos', function (req, res) {
  let searchQuery = req.body.searchTerm;
  if (searchQuery === '') {
    res.status(400).send('You need to enter a search term')
  } else {
    getReposByUsername(searchQuery, (err, data) => {
      if (err) {
        res.status(400).send('Sorry, no repos found with that username')
      }
      // If we get back data dfrom the API, we need to kickoff the dupe check + saving process by calling dbMethods.findDupe
      // This will trigger a save for each item if dupes are not found:
      data.forEach((item) => {
        dbMethods.findDupe(item, (err, success) => {
          if (err) throw err;
          console.log(success)
        });
      })
      res.status(200).send('Search Complete');
    });
  }
});

app.get('/repos', function (req, res) {
  // 'TOP 25' = First 25:
  dbMethods.get25((data) => {
    res.status(200).send(data);
  });
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

