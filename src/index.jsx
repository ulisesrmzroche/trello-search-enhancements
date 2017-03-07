import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './modules/application/container';

// const onSearchInput = ($searchBar, fetch) => {
//   $searchBar.on('input', (e) => {
//     const match = isMatch($searchBar);
//     if (match) {
//       e.preventDefault();
//       runSearch($searchBar, fetch)
//       .then((cards) => {
//         const hasCards = cards.length;
//         if (!hasCards) return false;
//         return renderCards(cards);
//       });
//     }
//   });
// };

export default ((fetch) => {
  $(() => {
    $('.search-results-view').prepend('<div id="trello-team-search"></div>');
    const $mount = $('#trello-team-search').promise();
    $mount.then((element) => {
      ReactDOM.render(<App />, document.getElementById('trello-team-search'));
    });
  });
})(window.fetch);
