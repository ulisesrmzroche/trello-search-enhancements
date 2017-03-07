import ENV from './../../config/environment';

export function fetchOrganizations(organizations) {
  console.log('fetching organizations...')
  let endpoint = 'https://trello.com/1/search';
  endpoint += `?query=${organizations}&partial=true&modelTypes=organizations`;
  endpoint += `&key=${ENV.INTEGRATIONS.trello.devKey}&token=${ENV.INTEGRATIONS.trello.devToken}`;
  return new Promise((resolve, reject) => {
    return fetch(endpoint)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      const _organizations = json.organizations;
      return resolve(_organizations);
    })
    .catch((e) => {
      return reject(e);
    });
  });
}

export function fetchBoards(organization) {
  console.log('fetching boards...')
  let endpoint = `https://trello.com/1/organizations/${organization.id}/boards?filter=open`;
  endpoint += `&key=${ENV.INTEGRATIONS.trello.devKey}&token=${ENV.INTEGRATIONS.trello.devToken}`;
  return new Promise((resolve, reject) => {
    return fetch(endpoint)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      const _boards = json;
      return resolve(_boards);
    })
    .catch((e) => {
      return reject(e);
    });
  });
}

export function fetchCards(query) {
  console.log('fetching cards...')
  const listRequests = [];
  query.boards.forEach((board) => {
    let endpoint = `https://trello.com/1/boards/${board.id}/lists?filter=open`;
    endpoint += `&key=${ENV.INTEGRATIONS.trello.devKey}&token=${ENV.INTEGRATIONS.trello.devToken}`;
    listRequests.push(
      new Promise((resolve, reject) => {
        return fetch(endpoint)
        .then((response) => {
          return response.json();
        })
        .then((json) => {
          const _boards = json;
          return resolve(_boards);
        })
        .catch((e) => {
          return reject(e);
        });
      })
    );
  });
  const targetList = query.list;
  let listResults = [];
  return Promise.all(listRequests).then((lists)=>{
    lists.forEach((boardLists)=>{
      let _lists = boardLists.filter((listItem)=>{
        const isMatch = listItem.name.toLowerCase().match(`${query.list}`, 'i');
        if (isMatch) {
          listResults.push(listItem);
        }
      })
    });
    return listResults;
  }).then((lLists)=>{
    const cardRequests = [];
    lLists.forEach((listItem) => {
      let endpoint = `https://trello.com/1/lists/${listItem.id}/cards`;
      if (query.cardState) {
        if (query.cardState === 'archived') {
          endpoint += '/closed';
        } else {
          endpoint += `/${query.cardState}`;
        }
      }
      endpoint += `?key=${ENV.INTEGRATIONS.trello.devKey}&token=${ENV.INTEGRATIONS.trello.devToken}`;
      cardRequests.push(
        new Promise((resolve, reject) => {
          return fetch(endpoint)
          .then((response) => {
            return response.json();
          })
          .then((json) => {
            const _boards = json;
            return resolve(_boards);
          })
          .catch((e) => {
            return reject(e);
          });
        })
      )
    });
    return Promise.all(cardRequests);
  }).then((cards) => {
    const results = [];
    cards.forEach((card) => {
      card.forEach((c) => {
        results.push(c);
      });
    });
    return {
      lists: listResults,
      cards: results,
    };
  });
}
