import React from 'react';

let RepoListItem = (props) => {

  let repo = props.repo;
  return (
    <ul style={{ listStyleType: "none" }}>
      <li>Repo Name: <a href={repo.repoUrl}>{repo.repoName}</a></li>
      <li>Repo Description: {repo.repoDescription}</li>
      <li>Repo Forks: {repo.repoForks}</li>
      <li>User: {repo.user}</li>
      <li>User URL: {repo.userUrl}</li>
    </ul>
  )
}

export default RepoListItem;