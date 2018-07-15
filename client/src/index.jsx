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

  success(){
    console.log('SUCCESS!');
  }

  failure(){
    console.log('Failure')
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
        200: this.success,
        400: this.failure
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

/*
        if(status === 200){
          console.log('The post request to the server was successful');
        } else if(term === '') {
          console.log('There was a problem posting data to the server. Check to make sure a name was entered.')
        } else {
          console.log('No repos were found under that handle.')
        }
*/