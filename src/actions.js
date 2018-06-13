import { createActionAsync } from 'redux-act-async';
import { createAction } from 'redux-act';
import { apiSearch, apiPerson, apiPersonCredits } from './api';

export const searchMulti = createActionAsync('SEARCH_MULTI', apiSearch);
export const updateHomeQuery = createAction('UPDATE_HOME_PAGE_QUERY');

export const getPerson = createActionAsync('GET_PERSON', apiPerson)
export const getPersonCredits = createActionAsync('GET_PERSON_CREDITS', apiPersonCredits)

// export const selectPerson = createActionAsync('SELECT_PERSON', callSelectPerson);

// export const addPerson = createAction('ADD_PERSON');
// export const removePerson = createAction('REMOVE_PERSON', (index)=>({index}));
// export const updatePerson = createAction('UPDATE_PERSON', (index, newValue) => ({index, newValue}));
