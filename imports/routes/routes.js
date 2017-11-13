import  { Meteor } from 'meteor/meteor';
import React  from 'react';
import { Router, Switch, Route, withRouter } from 'react-router';
import history from './history'

import Signup from '../ui/Signup';
import Dashboard from '../ui/Dashboard';
import NotFound from '../ui/NotFound';
import Login from '../ui/Login';

import FillTeam from '../ui/FillTeam';

const unauthenticatedPages = ['/','/signup'];
const authenticatedPages = ['/dashboard','/fillteam']
let isUnauthenticatedPage = true;
let isAuthenticatedPage = false;

const ChangeTracker = withRouter(({match, location, history}) => {
    const pathName = location.pathname;
    isUnauthenticatedPage = unauthenticatedPages.includes(pathName);
    isAuthenticatedPage = authenticatedPages.includes(pathName);
    return false;
});

export const onAuthChange = (isAuthenticated) => {
    if (isAuthenticated){
      if (isUnauthenticatedPage){
        history.replace('/dashboard');
      }
    }else{
      if (isAuthenticatedPage) {
        history.replace('/');
      }
    }
};

export const routes = (
  <Router history={history}>
    <div>
    <Switch>
    <Route exact path="/" component={Login}/>
    <Route path="/signup" component={Signup}/>
    <Route path="/dashboard" component={Dashboard} />
    <Route path="/fillteam" component={FillTeam} />
    <Route component={NotFound}/>
    </Switch>
    <ChangeTracker/>
    </div>
  </Router>
);