import React, { Component } from 'react'
import { connect } from 'react-redux';
import { searchMulti, updateHomeQuery } from '~/actions'
import { debounce, isEmpty } from 'lodash';
import SearchResults from './SearchResults';
import './Home.css';

class Home extends Component {
  constructor(props) {
    super(props);

    this.search = query => query.length ? this.props.searchMulti(query).catch(console.log) : () => {}
    this.debounceSearch = debounce(this.search, 3000)
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
        results={searchResults.response.results}
      />
    </div>
  }
}

Home = connect(state => state, {
  searchMulti,
  updateHomeQuery
})(Home)

export default Home;
