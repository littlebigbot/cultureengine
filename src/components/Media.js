import React, { Component } from 'react'
import { connect } from 'react-redux';

class Media extends Component {
  render() {
    return <div></div>
  }
}

Media = connect(state => state, {
})(Media)

export default Media
