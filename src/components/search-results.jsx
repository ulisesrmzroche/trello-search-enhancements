import React from 'react';
import Card from './card';

const SearchResults = (props) => {
  return (
    <div className="js-search-results u-clearfix u-relative">
      <div className="search-results-section js-card-results u-clearfix">
        <div className="search-results-section-header u-clearfix">
          <h4>Cards</h4>
        </div>
        <div className="js-list">
          {props.cards.map((card) => {
            return <Card card={card} key={card.id} />
          })}
        </div>
      </div>
    </div>
  );
};

SearchResults.propTypes = {
  cards: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
};

export default SearchResults;
