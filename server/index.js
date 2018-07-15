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
      dbMethods.findDupe(data, (err, success) => {
        console.log('error is ', err)
        if(err) {
          console.log('This should be getting sent')
          res.status(200).send(data);
        } else {
          console.log('No error?')
          res.status(200).send(data);
        }
      })
    });
  }
});

app.get('/repos', function (req, res) {
  // 'TOP 25' = Most forked
  dbMethods.get25((data) => {
    res.status(200).send(data);
  });
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

