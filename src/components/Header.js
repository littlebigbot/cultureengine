import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import _ from 'lodash';
import routes from '../routes';
import styles from './Header.css';

const Header = () => (
  <header styleName="styles.Header">
    <h1>
      CultureEngine
    </h1>
    <nav>
      <ul>
        <li><a href="https://github.com/littlebigbot" target="_blank">Who is the incredibly handsome and talented person behind this?</a></li>
      </ul>
    </nav>
  </header>
);


export default Header;
