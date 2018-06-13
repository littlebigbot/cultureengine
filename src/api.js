import { reduce, isUndefined } from 'lodash';
import { API_ROOT, API_KEY } from '~/constants';

function serialize(obj) {
  return reduce(obj, (result, val, key) => {
    if(!isUndefined(val)) {
      return result.concat(`${result === '?' ? '' : '&'}${key}=${encodeURIComponent(val)}`);
    }
    return result;
  }, '?');
}

function makeUrl(endpoint) {
  return endpoint.includes(API_ROOT) ? endpoint : API_ROOT + endpoint;
}

function api(endpoint, payload) {
  const url = makeUrl(endpoint);

  return fetch(url + serialize({api_key: API_KEY, ...payload}))
    .then((response) => {
      return response.json()
      	.then((json) => {
      		return { json, response };
      	});
    }).then(({ json, response }) => {
      if (response.ok) {
        return Promise.resolve(json)
      }
      return Promise.reject(json)
    })
}

export default api;

export const apiSearch = query => query ? api('/search/multi', { query }) : Promise.reject('Nothing to search');
export const apiPerson = id => id ? api(`/person/${id}`) : Promise.reject('id is required');
export const apiPersonCredits = id => id ? api(`/person/${id}/credits`) : Promise.reject('id is required');
// search/multi?language=en-US
// export const callSelectPerson = ({person}) => callApi(`/person/${person.id}`, {append_to_response: 'combined_credits'})
// export const callSearch = ({query}) => query ? callApi('/search/person', {query}) : Promise.reject('Nothing to search')
// export const callSelectPerson = ({person}) => callApi(`/person/${person.id}/combined_credits`)
