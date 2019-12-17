import {createStore, thunk, action} from 'easy-peasy';
import {db} from './firebase';

export default createStore({
  login: {
    loggedIn: false,
    uid: null,
  },
  hackers: {
    items: [],
    fetch: thunk(async (actions, payload) => {
      const docs = await db.collection('hacker_email_2020').get();
      console.log('fetching...');
      actions.update(docs.docs.map(doc => doc.data()));
    }),
    update: action((state, updates) => {
      state.hackers = updates;
    }),
    initialise: thunk(async (actions, payload) => {
      console.log('calling fetch');
      await actions.fetch();
    }),
  },
});
