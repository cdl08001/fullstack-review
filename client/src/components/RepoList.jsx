import React from 'react';
import RepoListItem from './RepoListItem.jsx'

const RepoList = (props) => {
  let repos = props.repos.map((repo) => 
    <RepoListItem key={repo.id.toString()} repo={repo} />);
  return (
    <div>
      <h4> Repo List Component </h4>
      Here are the top {props.repos.length} repos!
      <div><br></br>
        {repos}
      </div>
    </div>
  )
}

export default RepoList;