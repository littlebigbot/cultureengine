import { createReducerAsync } from 'redux-act-async';
import { createReducer } from 'redux-act';
import { searchMulti, updateHomeQuery, getPerson, getPersonCredits } from './actions';
import { combineReducers } from 'redux'
import _ from 'lodash';
// import colorHash from 'material-color-hash';

const defaultAsyncState = {
  loading: false,
  request: null,
  data: null,
  error: null
};

const defaultSearchResultsState = {
  query: '',
  ...defaultAsyncState,
  response: []
};

// const defaultPersonState = () => ({
//   query: '',
//   loading: false,
//   data: null,
//   error: null,
//   // style: colorHash(Math.random().toString(36).substring(7))
// });

Array.prototype.updateAtIndex = function(i, el, merge) {
  return [
    ...this.slice(0, i),
    merge ? _.merge({}, this[i], el) : el,
    ...this.slice(i + 1, this.length)
  ];
};

Array.prototype.removeAtIndex = function(i) {
  return [
    ...this.slice(0, i),
    ...this.slice(i + 1, this.length)
  ];
};

const searchResults = createReducer({
  // [addPerson]: (state) => {
  //   if(state.data.length < MAX_PEOPLE) {
  //     return {
  //       ...state,
  //       data: state.data.concat({})
  //     };
  //   }
  //   return state;
  // },
  // [removePerson]: (state, {index}) => {
  //   if(state.data.length > MIN_PEOPLE) {
  //     return {
  //       ...state,
  //       data: state.data.removeAtIndex(index)
  //     }
  //   }
  //   return state;
  // },
  // [updatePerson]: (state, {index}) => {
  //   return {
  //     ...state,
  //     data: state.data.updateAtIndex(index, {})
  //   };
  // },
  [updateHomeQuery]: (state, query) => {
    console.log(state, query)
    return {
      ...state,
      query
    };
  },
  [searchMulti.request]: (state, payload) => ({
      ...state,
      request: payload,
      loading: true,
      error: null
  }),
  [searchMulti.ok]: (state, payload) =>
  ({
      ...state,
      loading: false,
      //payload.request[0] instead of payload.request because redux-act-async isnt perfectly designed
      response: payload.response
  }),
  [searchMulti.error]: (state, payload) => ({
      ...state,
      loading: false,
      error: payload.error
  }),
  [searchMulti.reset]: () => (defaultSearchResultsState)
} , defaultSearchResultsState);

const person = createReducer({
  [getPerson.request]: (state, payload) => ({
    ...state,
    loading: true,
    error: null,
    data: {}
  }),
  [getPerson.ok]: (state, payload) => ({
    ...state,
    loading: false,
    data: payload.response
  }),
  [getPerson.error]: (state, payload) => ({
    ...state,
    error: payload.error
  }),
  [getPersonCredits.request]: (state, payload) => ({
    ...state,
    loading: true,
    error: null,
    credits: []
  }),
  [getPersonCredits.ok]: (state, payload) => ({
    ...state,
    loading: false,
    credits: payload.response
  }),
  [getPersonCredits.error]: (state, payload) => ({
    ...state,
    error: payload.error
  })
}, { ...defaultAsyncState, credits: []});

// const people = createReducer({
//   [selectPerson.request]: (state, payload) => state.updateAtIndex(
//     payload.index,
//     {
//       loading: true,
//       error: null
//     },
//     true
//   ),
//   [selectPerson.ok]: (state, payload) => state.updateAtIndex(
//     payload.request[0].index,
//     {
//       loading: false,
//       data: payload.response
//     },
//     true
//   ),
//   [selectPerson.error]: (state, payload) => state.updateAtIndex(
//     payload.request[0].index,
//     {
//       loading: false,
//       error: payload.error
//     },
//     true
//   ),

//   [search.request]: (state, payload) => state.updateAtIndex(
//     payload.index,
//     {
//       query: state[payload.index].query
//     },
//     true
//   ),

//   [addPerson]: (state) => {
//     if(state.length < MAX_PEOPLE) {
//       return state.concat(defaultPersonState());
//     }
//     return state;
//   },
//   [removePerson]: (state, {index}) => {
//     if(state.length > MIN_PEOPLE) {
//       return state.removeAtIndex(index);
//     }
//     return state;
//   },
//   [updatePerson]: (state, {index, newValue}) => state.updateAtIndex(index, {data: null, query: newValue}, true)
// }, [defaultPersonState(), defaultPersonState()])

//_.fill(Array(INIT_PEOPLE), defaultPersonState())
const rootReducer = combineReducers({
  // routing,
  searchResults,
  person
  // people
})

export default rootReducer
