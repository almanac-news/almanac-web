import React                 from 'react'
import { Route, IndexRoute } from 'react-router'
import CoreLayout            from 'layouts/CoreLayout'
import LandingView           from 'views/LandingView'
import HomeView              from 'views/HomeView'
import AboutView             from 'views/AboutView'
import NewsPageView          from 'views/NewsPageView'
import NotFoundView from 'views/NotFoundView'
import SubscriptionView from 'views/SubscriptionView'

export default (
  <Route path='/' component={CoreLayout}>
    <IndexRoute component={LandingView} />
    <Route path='home' component={HomeView} />
    <Route path='about' component={AboutView} />
    <Route path='subscription' component={SubscriptionView} />
    <Route path='news/:id' component={NewsPageView} />
    <Route path='*' component={NotFoundView} />
  </Route>
)
