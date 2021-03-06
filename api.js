const BASE_URL = 'https://www.omdbapi.com/?apikey=5ace8b4c'

const getQueryString = obj => {
  const keys = Object.keys(obj)
  return keys.map(key => `${key}=${encodeURIComponent(obj[key])}`).join('&')
}

const deserialize = response => {
  if (!response.ok) throw new Error('There was a problem fetching your request')

  return response.headers.get('Content-Type') && response.headers.get('Content-Type').includes('json')
    ? response.json()
    : response.text()
}

const sendRequest = config => {
  const queryString = getQueryString(config)
  const url = `${BASE_URL}&${queryString}`
  console.log(url)
  return fetch(url).then(deserialize)
}

const processSearchResult = result => ({
  ...result,
  id: result.imdbID,
})

const processSearchResults = ({Search, totalResults}) => ({
  results: Search.map(processSearchResult),
  resultCount: totalResults,
})

export const search = (query, page = 1, additionalConfig = {}) =>
  sendRequest({...additionalConfig, s: query, page})
    .then(processSearchResults)
    // also include original query so that we can invalidate requests from old queries
    .then(results => ({query, ...results}))

export const getMovie = (id, additionalConfig = {}) => sendRequest({...additionalConfig, i: id})
