import React                 from 'react'
import { Route, IndexRoute } from 'react-router'
import CoreLayout            from 'layouts/CoreLayout'
import HomeView              from 'views/HomeView'
import AboutView             from 'views/AboutView'
import NewsPageView          from 'views/NewsPageView'
import NotFoundView from 'views/NotFoundView'
import SubscriptionView from 'views/SubscriptionView'

export default (
  <Route path='/' component={CoreLayout}>
    <IndexRoute component={HomeView} />
    <Route path='about' component={AboutView} />
    <Route path='subscription' component={SubscriptionView} />
    <Route path='news/:id' component={NewsPageView} />
    <Route path='*' component={NotFoundView} />
  </Route>
)
