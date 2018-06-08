import React from 'react';
import { Route, Switch, NavLink } from 'react-router';
import HomePage from './components/HomePage';
import PersonPage from './components/PersonPage';
import MoviePage from './components/MoviePage';
import TvPage from './components/TvPage';
import Header from './components/Header';

export default (
  <div>
    <Header/>
    <Route exact path="/" component={HomePage} />
  </div>
);
