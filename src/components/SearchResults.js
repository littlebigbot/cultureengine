import React, { Component } from 'react'
import './SearchResults.css'
import { tmdbThumbnailSrc } from '~/utility';
import { Link } from 'react-router-dom';

class SearchResults extends Component {
  constructor(props) {
    super(props);
    this._renderPerson = this._renderPerson.bind(this);
    this._renderMedia = this._renderMedia.bind(this);
  }
  _renderPerson(person){
    return (
      <li styleName="result" key={person.id}>
        <Link to={`/person/${person.id}`}>
          <div styleName="thumbnail-wrap">
            <img src={tmdbThumbnailSrc(person, 185)} />
            <p>{person.media_type}</p>
          </div>
          <h4>{person.name}</h4>
          <ul>
            <li key="known-for">Known For:</li>
            {person.known_for.map(m => <li key={`known-for-${m.id}`} >{m.title}</li>)}
          </ul>
        </Link>
      </li>
    )
  }
  _renderMedia(media){
    return (
      <li styleName="result" key={media.media_type + media.id}>
        <Link to={`/${media.media_type}/${media.id}`}>
          <div styleName="thumbnail-wrap">
            <img src={tmdbThumbnailSrc(media, 185)} />
            <p>{media.media_type}</p>
          </div>
          <h4>{media.name || media.title}</h4>
          </Link>
      </li>
    )
  }
  render() {
    const { results } = this.props;
    return <ul styleName="SearchResults">
      {results && results.map(result => (result.media_type === 'person') ? this._renderPerson(result) : this._renderMedia(result))}
    </ul>;
  }
}

export default SearchResults;
