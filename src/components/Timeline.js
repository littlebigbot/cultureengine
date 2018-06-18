import React, { Component } from 'react'
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import { TITLE_PREFIX } from '~/constants';
import { vaporwave } from '~/utility';

class Timeline extends Component {
  constructor(props) {
    super(props)

    document.title = TITLE_PREFIX + vaporwave(' - TIMELINE');
  }
  render() {
    return <div></div>
  }
}

Timeline.propTypes = {
  
}

Timeline = connect(state => state, {
})(Timeline)

export default Timeline
