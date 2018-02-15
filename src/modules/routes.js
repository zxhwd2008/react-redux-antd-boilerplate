import React from 'react'
import { Route, IndexRoute, Redirect } from 'react-router'

import { RootContainer } from 'containers/RootContainer'
import { GithubStarredManagerContainer } from 'containers/GithubStarredManagerContainer'
import { GithubReposDetailsContainer } from 'containers/GithubReposDetailsContainer'

export default (
  <Route path="/" component={RootContainer}>
    <IndexRoute component={GithubStarredManagerContainer} />

    <Route path="/:user/:repos" component={GithubReposDetailsContainer} />

    <Redirect from="*" to="/" />
  </Route>
)
