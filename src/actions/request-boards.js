import { fetchBoards } from './../utils/api';

export default function requestBoards(fetch, organization) {
  console.log('request boards...')
  return fetchBoards(fetch, organization)
  .then((boards) => {
    return boards;
  })
  .catch((e) => {
    return e;
  })
}
