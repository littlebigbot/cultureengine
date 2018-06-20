import React, { Component } from 'react'
import { getPerson, getPersonCredits, getWikipediaPage } from '~/actions'
import { connect } from 'react-redux';
import { tmdbThumbnailSrc, vaporwave } from '~/utility';
import './Person.css'
import { isEmpty } from 'lodash';
import moment from 'moment';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faChartBar, faCircle } from "@fortawesome/fontawesome-pro-light";
import { TITLE_PREFIX } from '~/constants';

class Person extends Component {
  constructor(props) {
    super(props);
    const { getPerson, match, getPersonCredits, getWikipediaPage } = this.props;
    document.title = TITLE_PREFIX
    getPerson(match.params.id)
      .then(() => {
        const name = this.props.person.data.name
        getWikipediaPage(name)
        document.title = `${TITLE_PREFIX} - ${vaporwave(name)}` 
      })
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
    const { data, credits, wiki } = this.props.person;
    console.log(wiki && wiki.text)
    if(!isEmpty(data) && !isEmpty(credits)) {
      return <div styleName="Person">
        <header>
          <div styleName="profile-image-wrap">
            <img src={tmdbThumbnailSrc(data, 185)} />
          </div>

          <h1>{data.name}</h1>
          
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
        </header>
        <main>
          <section>
            <h1>Age at release date</h1>
            {credits.cast.map(this.renderCredits)}
          </section>
          <section>
            <h1>Wiki</h1>
            {wiki && <div dangerouslySetInnerHTML={{__html: wiki.text['*']}}/>}
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
  getWikipediaPage: PropTypes.func,
  match: PropTypes.object,
  person: PropTypes.object
}

Person = connect(state => state, {
  getPerson,
  getPersonCredits,
  getWikipediaPage
})(Person)

export default Person
