export default function isMatch($searchBar) {
  const currentValue = $searchBar.val();
  return currentValue.match(/(team|org|organization):/);
}
