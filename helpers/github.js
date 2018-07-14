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

  // This helper function helps us convert the incoming API data into a format that we want to save to our DB:
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