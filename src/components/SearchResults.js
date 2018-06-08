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
      <li styleName="result" key={person.id} onClick={() => this.props.onSelect(p)}>
        <Link to="/person/{{media.id}}">
          <div styleName="thumbnail-wrap">
            <img src={tmdbThumbnailSrc(person, 185)} />
            <p>{person.media_type}</p>
          </div>
          {person.name}
        </Link>
      </li>
    )
  }
  _renderMedia(media){
    return (
      <li styleName="result" key={media.id} onClick={() => this.props.onSelect(p)}>
        <Link to="/{{media.media_type}}/{{media.id}}">
          <div styleName="thumbnail-wrap">
            <img src={tmdbThumbnailSrc(media, 185)} />
            <p>{media.media_type}</p>
          </div>
          {media.original_name || media.original_title}
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
