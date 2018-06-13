import React from 'react';
import { Route, Switch, NavLink } from 'react-router';
import Home from './components/Home';
import Person from './components/Person';
import Movie from './components/Movie';
import Tv from './components/Tv';
import Header from './components/Header';

export default (
  <div>
    {/*<Header/>*/}
    <Route exact path="/" component={Home} />
    <Route path="/person/:id" component={Person} />
    <Route path="/movie/:id" component={Movie} />
    <Route path="/tv/:id" component={Tv} />
    {/* <Route path="/venn" */}
  </div>
);
