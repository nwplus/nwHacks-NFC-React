import {createStore, thunk, action} from 'easy-peasy';
import {
  watchSelected,
  watchUser,
  login,
  logout,
  watchHackers,
  watchEvents,
  watchTestHackers,
} from './firebase';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

const model = {
  auth: {
    loggedIn: false,
    email: null,
    listeners: [],
    login: thunk(async (actions, payload) => {
      const loginResult = await login(payload);
      if (!loginResult) {
        return false;
      }
      actions.setLogin({success: true, email: loginResult.user.email});
      return true;
    }),
    logout: thunk(async actions => {
      try {
        actions.clearListeners();
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
    clearListeners: action(state => {
      state.listeners.forEach(func => {
        try {
          func();
        } catch (e) {
          return;
        }
      });
      state.listeners = [];
    }),
    pushListener: action((state, listener) => {
      if (!state.listeners) {
        state.listeners = [];
      }
      state.listeners.push(listener);
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
  scan: {
    scanMode: '',
    uid: null,
    hacker: null,
    setScanMode: action((state, {mode, payload}) => {
      if (mode === 'uid') {
        state.scanMode = 'uid';
        state.uid = payload;
        state.hacker = null;
      } else if (mode === 'hacker') {
        state.scanMode = 'hacker';
        state.hacker = payload;
        state.uid = null;
      } else {
        state.scanMode = '';
        state.hacker = null;
        state.uid = null;
      }
    }),
  },
  project: {
    mode: 'test',
    setMode: action((state, payload) => {
      state.mode = payload;
    }),
  },
  initialise: thunk(actions => {
    actions.auth.pushListener(watchHackers(actions.hackers.update));
    actions.auth.pushListener(watchUser(actions.auth.setLogin));
    actions.auth.pushListener(watchEvents(actions.events.setEvents));
  }),
  initialiseTest: thunk(actions => {
    actions.auth.pushListener(watchTestHackers(actions.hackers.update));
    actions.auth.pushListener(watchUser(actions.auth.setLogin, true));
    actions.auth.pushListener(watchEvents(actions.events.setEvents));
  }),
};

const store = createStore(model, {
  reducerEnhancer: reducer =>
    persistReducer(
      {
        key: 'easypeasystate',
        storage: AsyncStorage,
        whitelist: ['auth', 'project'],
      },
      reducer,
    ),
});

export default store;
