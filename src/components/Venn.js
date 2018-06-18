import React, { Component } from 'react'
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import { getPerson, getPersonCredits } from '~/actions'

class Venn extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    const ids = props.match.params['0'].split('/').splice(1);
    if(!isEmpty(ids) && isEmpty(props.person.data)) {
      // ids.map(props.vennGet)
    }
  }
  render() {
    return <div></div>
  }
}

Venn.propTypes = {
  getPerson: PropTypes.func,
  getPersonCredits: PropTypes.func,
  person: PropTypes.object,
  match: PropTypes.object
}

Venn = connect(state => state, {
  getPerson,
  getPersonCredits
})(Venn)

export default Venn
