import { fetchOrganizations } from './../utils/api';

export default function requestOrganizations(fetch, organization) {
  console.log('requesting organizations...')
  console.log('organization: ', organization)
  return new Promise((resolve, reject) => {
    return fetchOrganizations(fetch, organization)
    .then((organizations) => {
      resolve(organizations);
    })
    .catch((e) => {
      reject(e);
    });
  });
}
