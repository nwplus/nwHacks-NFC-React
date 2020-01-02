import {createStore, thunk, action} from 'easy-peasy';
import {
  watchSelected,
  watchUser,
  login,
  logout,
  watchHackers,
  watchEvents,
} from './firebase';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

const model = {
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
      try {
        await logout();
      } catch (e) {
        console.log(e);
      }
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
  registered: {
    on: false,
    selectedApplicant: null,
    register: thunk((actions, deviceID) => {
      watchSelected(deviceID, actions.setApplicant);
      actions.setOn(true);
    }),
    setApplicant: action((state, applicantInfo) => {
      state.selectedApplicant = applicantInfo;
    }),
    setOn: action((state, toggle) => {
      state.on = toggle;
    }),
  },
  events: {
    all: [],
    meals: [],
    workshops: [],
    scannedEvent: null,
    setEvents: action((state, payload) => {
      (state.all = payload.all), (state.meals = payload.meals);
      state.workshops = payload.workshops;
    }),
    setScanning: action((state, payload) => {
      state.scannedEvent = payload;
    }),
  },
  initialise: thunk(actions => {
    watchHackers(actions.hackers.update);
    watchUser(actions.auth.setLogin);
    watchEvents(actions.events.setEvents);
  }),
};

const store = createStore(model, {
  reducerEnhancer: reducer =>
    persistReducer(
      {
        key: 'easypeasystate',
        storage: AsyncStorage,
        whitelist: ['auth'],
      },
      reducer,
    ),
});

export default store;
