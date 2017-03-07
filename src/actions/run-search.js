import $ from 'jquery';
import requestCards from './request-cards';

const extractOrganization = (terms) => {
  const organizations = terms.filter((term) => {
    return term.match(/(team|org|organization):/);
  });
  let _organization = organizations[0];
  _organization = _organization.replace(/organization:/, '');
  return _organization;
};

const extractLists = (terms) => {
  const lists = terms.filter((term) => {
    return term.match(/list:/);
  });
  let _list = lists[0];
  _list = _list.replace(/list:/, '');
  return _list;
};

const extractBoards = (terms) => {
  const boards = terms.filter((term) => {
    return term.match(/board:/);
  });
  let _board = boards[0];
  if (!_board) return false;
  _board = _board.replace(/board:/, '');
  return _board;
};

const extractIsQuery = (terms) => {
  const operators = terms.filter((term) => {
    return term.match(/is:/);
  });
  let _operator = operators[0];
  if (!_operator) return false;
  _operator = _operator.replace(/is:/, '');
  return _operator;
};

export default function runSearch($searchBar, fetch) {
  console.log('SEARCH');
  const query = {};
  const terms = $searchBar.val().split(' ');

  if (extractOrganization(terms)) {
    query.organization = extractOrganization(terms);
  }
  if (!query.organization) return false;

  if (extractLists(terms)) {
    query.list = extractLists(terms);
  }

  if (extractBoards(terms)) {
    query.board = extractBoards(terms);
  }

  if (extractIsQuery(terms)){
    query.cardState = extractIsQuery(terms);
  }

  console.log('Search Query:', query);
  return requestCards(query).then((cards) => {
    $('.search-warning.js-no-results').addClass('hide');
    return cards;
  });
}
