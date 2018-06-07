import { createActionAsync } from 'redux-act-async';
import { createAction } from 'redux-act';
import { apiSearch } from './api';

export const search = createActionAsync('SEARCH', apiSearch);
export const updateHomePageQuery = createAction('UPDATE_HOME_PAGE_QUERY');

// export const selectPerson = createActionAsync('SELECT_PERSON', callSelectPerson);

// export const addPerson = createAction('ADD_PERSON');
// export const removePerson = createAction('REMOVE_PERSON', (index)=>({index}));
// export const updatePerson = createAction('UPDATE_PERSON', (index, newValue) => ({index, newValue}));
