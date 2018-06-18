// This is just a blank template for faster
// creation of new components

import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class _BLANK_ extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <div></div>
  }
}

_BLANK_.propTypes = {
}

_BLANK_ = connect(state => state, {
})(_BLANK_)

export default _BLANK_
