import {createStore, thunk, action} from 'easy-peasy';
import firebase from 'react-native-firebase';

const db = firebase.firestore();

export default createStore({
  hackers: {
    items: [],
    fetch: thunk(async (actions, payload) => {
      const docs = await db.collection('hacker_info_2020').get();
      actions.update(docs.docs.map(doc => doc.data()));
    }),
    update: action((state, updates) => {
      state.hackers = updates;
    }),
  },
});
