import {createStore, thunk, action} from 'easy-peasy';
import {db, login, logout} from './firebase';

export default createStore({
  auth: {
    loggedIn: false,
    email: null,
    login: thunk(async (actions, payload) => {
      const loginResult = await login();
      if (!loginResult) {
        return false;
      }
      actions.setLogin({success: true, email: loginResult.user.email});
    }),
    logout: thunk(async actions => {
      await logout();
      actions.setLogin({success: false, email: null});
    }),
    setLogin: action((state, {success, email}) => {
      state.loggedIn = success;
      state.email = email;
    }),
  },
  hackers: {
    items: [],
    fetch: thunk(async (actions, payload) => {
      const docs = await db.collection('hacker_email_2020').get();
      console.log('fetching...');
      const res = docs.docs.map(doc => doc.data());
      console.log(res);
      actions.update(res);
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
