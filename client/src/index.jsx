import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: [],
      searchCache: {}
    }
  this.success = this.success.bind(this);
  }

  componentDidMount() {
    $.ajax({
      url: '/repos',
      method: 'GET',
      complete: (data) => {
        this.setState({
          repos: data.responseJSON
        })
      }
    });
  }

  success(data) {
    let newRepos = JSON.parse(data.responseText);
    this.setState({
      repos: newRepos
    })
  }

  search (term) {
    let test = {searchTerm: term};
    $.ajax({
      contentType: 'application/json',
      dataType: 'application/json',
      url: '/repos',
      method: 'POST',
      data: JSON.stringify(test),
      statusCode: {
        200:  this.success,
        400:  function(data) {
                console.log('Failure')
              }
      }
    })
  }
 
  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));