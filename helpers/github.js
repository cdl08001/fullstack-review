const request = require('request');
const config = require('../config.js');

let getReposByUsername = (userName, callback) => {
  let options = {
    method: 'GET',
    url: 'https://api.github.com/search/repositories',
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`,
    },
    qs: {
      q: `user:${userName}`
    }
  };

  // We need a helper function to filter the data we recieve from the API:
  let convertData = (resultsObject) => {
    let itemList = resultsObject["items"];
    let filteredItems = [];
    if(itemList === undefined){
      callback('No Results Found.')
    } else {
      itemList.forEach((item) => {
        let filteredItem = {};
        filteredItem.id = item.id; 
        filteredItem.user = item.owner.login;
        filteredItem.userUrl = item.owner.html_url;
        filteredItem.repoName = item.name;
        filteredItem.repoDescription = item.description;
        filteredItem.repoUrl = item.html_url;
        filteredItem.forks = item.forks_count;
        filteredItems.push(filteredItem);
      })     
      return filteredItems; 
    }
  }

  request(options, function(error, response, body) {
    if(error) throw error;
    callback(null, convertData(JSON.parse(body)));
  })

}

module.exports = getReposByUsername;


/*
The things I care about when getting data back from the API are:

body.items (object containing an 'items' key, which is an array of items).

Extract the following: 

item.id // 36949278
item.name // models OR n2A
item.description // "An object-oriented language for modeling large-scale neural systems.........
item.owner.login //frothga
item.ownner.html_url // "https://api.github.com/users/octocat"
item.html_url // "https://github.com/octocat/git-consortium"

This will result in:
[ { id: 36949278,
    user: 'frothga',
    userUrl: 'https://github.com/frothga',
    repoName: 'n2a',
    repoDescription:
     'An object-oriented language for modeling large-scale neural systems, along with an IDE for writing and simulating models.',
    repoUrl: 'https://github.com/frothga/n2a' },
  { id: 103039460,
    user: 'frothga',
    userUrl: 'https://github.com/frothga',
    repoName: 'models',
    repoDescription: 'Initial library of neural models for N2A.',
    repoUrl: 'https://github.com/frothga/models' } ]



*/