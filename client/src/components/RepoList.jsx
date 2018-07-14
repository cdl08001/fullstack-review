import React from 'react';
import RepoListItem from './RepoListItem.jsx'

const RepoList = (props) => {
  let repos = props.repos.map((repo) => 
    <RepoListItem key={repo.id.toString()} repo={repo} />);
  console.log(repos)
  return (
    <div>
      <h4> Repo List Component </h4>
      There are {props.repos.length} repos.
      {repos}
    </div>
  )
}

export default RepoList;