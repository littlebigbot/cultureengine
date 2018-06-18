import React from 'react';
import { Route/*, Switch, NavLink*/ } from 'react-router';
import Home from './components/Home';
import Person from './components/Person';
import Media from './components/Media';
import Timeline from './components/Timeline';
import Venn from './components/Venn';
// import Header from './components/Header';

export default (
  <div>
    {/*<Header/>*/}
    <Route exact path="/" component={Home} />
    <Route path="/person/:id" component={Person} />
    <Route path="/movie/:id" component={Media} />
    <Route path="/venn*" component={Venn} />
    <Route path="/timeline/:id" component={Timeline} />
  </div>
);
