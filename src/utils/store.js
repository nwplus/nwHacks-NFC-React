import {createStore, thunk, action} from 'easy-peasy';
import {
  watchSelected,
  watchUser,
  login,
  logout,
  watchHackers,
  watchEvents,
  db,
} from './firebase';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

const model = {
  checkLogin: thunk((actions, payload, {getStoreState}) => {
    const state = getStoreState();
    if (state.project.mode === 'test' && payload.test === true) {
      actions.auth.setLogin({success: true, email: payload.email});
    } else if (state.project.mode !== 'test' && payload.test === false) {
      actions.auth.setLogin({success: true, email: payload.email});
    }
  }),
  auth: {
    loggedIn: false,
    email: null,
    listeners: [],
    login: thunk(async (actions, payload, {getStoreActions}) => {
      const loginResult = await login(payload);
      if (!loginResult) {
        return false;
      }
      await getStoreActions().forceUpdateHackers();
      actions.setLogin({success: true, email: loginResult.user.email});
      return true;
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
  },
  forceUpdateHackers: thunk(async actions => {
    const ref = await db
      .collection('hacker_info_2020')
      .where('tags.accepted', '==', true)
      .get();
    actions.updateHackers(ref);
  }),
  updateHackers: action((state, ref) => {
    if (!ref) {
      return;
    }
    const isTest = state.project.mode === 'test';
    const {docs} = ref;
    const data = isTest
      ? docs.map(d => d.data()).filter(doc => doc.tags && doc.tags.test)
      : docs.map(d => d.data());
    state.hackers.items = data;
  }),
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
      state.all = payload.all;
      state.meals = payload.meals;
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
    watchHackers(actions.updateHackers);
    watchEvents(actions.events.setEvents);
    watchUser(actions.checkLogin);
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
