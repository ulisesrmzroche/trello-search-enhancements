import React from 'react';
import $ from 'jquery';
import isMatch from './../../helpers/is-match';
import runSearch from './../../actions/run-search';
import SearchResults from './../../components/search-results';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      cards: [],
    };
  }
  componentDidMount() {
    console.log('Detecting for a team match');
    const $searchBar = $('.header-search-input');
    if (isMatch($searchBar)) {
      runSearch($searchBar)
      .then((cards) => this._onSearchSuccess(cards));
    }
    this._observeSearchBar();
  }
  _onSearchSuccess(cards) {
    const hasCards = cards.length;
    if (!hasCards) return false;
    return this.setState({ cards });
  }
  _observeSearchBar() {
    const $searchBar = $('.header-search-input');
    $searchBar.on('input', (e) => {
      const match = isMatch($searchBar);
      if (match) {
        e.preventDefault();
        runSearch($searchBar)
        .then((cards) => this._onSearchSuccess(cards));
      }
    });
  }
  render() {
    return (
      <div className="tts-application-container">
        {this.state.cards.length ? <SearchResults cards={this.state.cards} /> : false}
      </div>
    );
  }
}
