import requestBoards from './request-boards';
import requestOrganizations from './request-organizations';
import { fetchCards } from './../utils/api';

const normalizeCards = (data) => {
  console.log('normalizing cards...');
  console.log('data', data);
  const _cards = [];
  data.cards.forEach((card) => {
    const _card = card;
    _card.organization = data.organization;
    _card.board = (() => {
      const _boards = data.boards.filter((board) => {
        const boardMatch = board.id === _card.idBoard
        if (!boardMatch) return false;
        return board;
      });
      if (!_boards.length) return false;
      return _boards[0];
    })();
    _card.list = (() => {
      const _lists = data.lists.filter((list) => {
        const listMatch = list.id === _card.idList
        if (!listMatch) return false;
        return list;
      });
      if (!_lists.length) return false;
      return _lists[0];
    })();
    _cards.push(_card);
  });
  return _cards;
};

export default function requestCards(options) {
  const _organizations = options.organization.replace(/team:/, '');
  console.log('Requesting cards');

  const data = {};

  return requestOrganizations(_organizations)
  .then((organizations) => {
    const hasOrganizations = organizations.length;
    if (!hasOrganizations) return false;
    data.organization = organizations[0];
    return requestBoards(organizations[0]);
  })
  .then((boards) => {
    const hasBoards = boards.length;
    if (!hasBoards) return false;
    data.boards = boards;
    return fetchCards({
      boards,
      list: options.list,
      cardState: options.cardState,
    });
  })
  .then((results) => {
    const hasCards = results.cards.length;
    if (!hasCards) return false;
    data.cards = results.cards;
    data.lists = results.lists;
    const _cards = normalizeCards(data);
    return _cards;
  })
  .catch(e => e);
}
