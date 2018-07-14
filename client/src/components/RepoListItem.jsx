import React from 'react';

let RepoListItem = (props) => {
  let repo = props.repo;
  return (
    <div>
      User: {repo.user}<br></br>
      User URL: {repo.userUrl}<br></br>
      Repo Name: {repo.repoName}<br></br>
      Repo Description: {repo.repoDescription}<br></br>
      Repo URL: {repo.repoUrl}<br></br>
      <br></br>
    </div>

  )
}

export default RepoListItem;