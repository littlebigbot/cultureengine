import React, { Component } from 'react'
import { getPerson, getPersonCredits } from '~/actions'
import { connect } from 'react-redux';
import { tmdbThumbnailSrc } from '~/utility';
import './Person.css'
import { isEmpty } from 'lodash';
import moment from 'moment';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faChartBar, faCircle } from "@fortawesome/fontawesome-pro-light";

class Person extends Component {
  constructor(props) {
    super(props);
    const { getPerson, match, getPersonCredits } = this.props;
    getPerson(match.params.id)
    getPersonCredits(match.params.id)

    this.renderCredits = this.renderCredits.bind(this);
  }
  renderCredits(credit) {
    const { birthday, deathday } = this.props.person;
    if(!credit.release_date) {
      return;
    }
    var releaseDate = credit.release_date ? moment(credit.release_date, 'YYYY-MM-DD') : null;
    return <div key={credit.id} styleName={releaseDate > deathday ? "posthumous" : "" }>
      {credit.title}
      {releaseDate ? ` - ${credit.release_date} (${releaseDate.diff(birthday, 'years')} years old)` : ''}
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
          <nav>
            <ul>
              <li>
                <Link to={`/timeline/${this.props.match.params.id}`}>
                  <FontAwesomeIcon icon={faChartBar} />
                  Timeline
                </Link>
              </li>
              <li>
                <Link to={`/venn/${this.props.match.params.id}`}>
                  <FontAwesomeIcon icon={faCircle} />
                  <FontAwesomeIcon icon={faCircle} />
                  Venn
                </Link>
              </li>
            </ul>
          </nav>
          <section>
            <h1>Age at release date</h1>
            {credits.cast.map(this.renderCredits)}
          </section>
        </main>
      </div>
    } else {

    }
    return <div>Loading...</div>;
  }
}

Person.propTypes = {
  getPerson: PropTypes.func,
  getPersonCredits: PropTypes.func,
  match: PropTypes.object,
  person: PropTypes.object
}

Person = connect(state => state, {
  getPerson,
  getPersonCredits
})(Person)

export default Person
