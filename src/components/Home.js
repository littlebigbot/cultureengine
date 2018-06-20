import React, { Component } from 'react'
import { connect } from 'react-redux';
import { searchMulti, updateHomeQuery } from '~/actions'
import { debounce } from 'lodash';
import SearchResults from './SearchResults';
import PropTypes from 'prop-types';
import { TITLE_PREFIX } from '~/constants';
import './Home.css';

class Home extends Component {
  constructor(props) {
    super(props);

    this.search = query => query.length ? this.props.searchMulti(query).catch(console.log) : () => {}
    this.debounceSearch = debounce(this.search, 3000)
    document.title = TITLE_PREFIX;
  }
  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.debounceSearch.cancel();
      this.search(e.target.value)
    }
  }
  handleChange(e) {
    const { query, updateHomeQuery } = this.props;
    const newQuery = e.target.value;
    if(query !== newQuery) {
      updateHomeQuery(newQuery)
      this.debounceSearch(newQuery)
    }
  }
  render() {
    const { query, searchResults } = this.props;
    return <div styleName="Home">
      <h1>C U L T U R E  E N G I N E</h1>
      <input
        type="search"
        name="search"
        value={query}
        styleName="search"
        onKeyPress={this.handleKeyPress.bind(this)}
        onChange={this.handleChange.bind(this)}
        autoFocus={true}
        autoComplete="off"
      />
      <div styleName="tooltip">Search for things</div>
      <SearchResults
        results={searchResults.results}
      />
    </div>
  }
}

Home.propTypes = {
  searchMulti: PropTypes.func,
  query: PropTypes.string,
  updateHomeQuery: PropTypes.func,
  searchResults: PropTypes.object
}

Home = connect(state => state, {
  searchMulti,
  updateHomeQuery
})(Home)


export default Home;
