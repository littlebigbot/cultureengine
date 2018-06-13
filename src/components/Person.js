import React, { Component } from 'react'
import { getPerson, getPersonCredits } from '~/actions'
import { connect } from 'react-redux';
import { tmdbThumbnailSrc } from '~/utility';
import './Person.css'
import { isEmpty } from 'lodash';

class Person extends Component {
  componentWillMount() {
    const { getPerson, match, getPersonCredits } = this.props;
    getPerson(match.params.id)
    getPersonCredits(match.params.id)

    this.renderCredits = this.renderCredits.bind(this);
  }
  renderCredits(credit) {
    return <div key={credit.id}>
      {credit.title}
    </div>
  }
  render() {
    const { data, credits } = this.props.person;
    if(!isEmpty(data) && !isEmpty(credits)) {
      return <div styleName="Person">
        <header>
          <div styleName="profile-image-wrap">
            <img src={tmdbThumbnailSrc(data, 185)} />
          </div>

          <h1>{data.name}</h1>
        </header>
        <main>
          <section>{data.biography}</section>
          <section>{credits.cast.map(this.renderCredits)}</section>
        </main>
      </div>
    }
    return <div>Loading...</div>;
  }
}

Person = connect(state => state, {
  getPerson,
  getPersonCredits
})(Person)

export default Person
