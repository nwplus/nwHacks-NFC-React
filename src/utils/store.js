import {createStore, thunk, action} from 'easy-peasy';
import {watchUser, login, logout, watchHackers} from './firebase';

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
    update: action((state, ref) => {
      if (!ref) {
        return;
      }
      const {docs} = ref;
      const data = docs.map(d => d.data());
      state.items = data;
    }),
  },
  initialise: thunk(actions => {
    watchHackers(actions.hackers.update);
    watchUser(actions.auth.setLogin);
  }),
});
