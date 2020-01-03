import firestore from '@react-native-firebase/firestore';
import {firebase} from '@react-native-firebase/auth';
import analytics from '@react-native-firebase/analytics';
import {GoogleSignin} from '@react-native-community/google-signin';

GoogleSignin.configure({
  scopes: ['https://www.googleapis.com/auth/userinfo.profile'],
  webClientId:
    '5043243303-otbpttl12vjtitiokg16sb0nctusapio.apps.googleusercontent.com', // required
});

export const auth = firebase.auth();
export const db = firestore();
analytics();

const isAdmin = async email => {
  const admins = (await db.collection('admins').get()).docs.filter(
    doc => doc.data().email === email,
  );
  return admins.length !== 0;
};

export const watchUser = callback => {
  auth.onAuthStateChanged(async user => {
    if (!user) {
      callback({success: false, email: null});
      return;
    }
    const {email} = user;
    if (await isAdmin(email)) {
      callback({success: true, email});
    } else {
      callback({success: false, email: null});
    }
  });
};

export const watchHackers = callback => {
  return db.collection('hacker_info_2020').onSnapshot(callback);
};

export const deviceExists = async id => {
  return (await db
    .collection('nfc_devices')
    .doc(id)
    .get()).exists;
};

export const newDevice = async (id, device) => {
  await db
    .collection('nfc_devices')
    .doc(id)
    .set(device);
};

export const checkIn = async (email, uid) => {
  return db
    .collection('hacker_info_2020')
    .doc(email)
    .update({
      'tags.checked-in': true,
      nfcID: uid,
    });
};

export const watchSelected = (id, callback) => {
  return db
    .collection('nfc_devices')
    .doc(id)
    .onSnapshot(async snap => {
      const {email, firstname, lastname} = (await db
        .collection('hacker_info_2020')
        .doc(snap.data().writeId)
        .get()).data();
      callback({
        email,
        firstname,
        lastname,
      });
    });
};

export const logout = async () => {
  await GoogleSignin.signOut();
  return auth.signOut();
};

export const login = async () => {
  try {
    const userInfo = await GoogleSignin.signIn();
    const credential = firebase.auth.GoogleAuthProvider.credential(
      userInfo.idToken,
      userInfo.accessToken,
    );
    const res = await auth.signInWithCredential(credential);
    if (await isAdmin(res.user.email)) {
      return res;
    } else {
      return null;
    }
  } catch (e) {
    return false;
  }
};

export const getUserFromUid = async uid => {
  return await db
    .collection('hacker_info_2020')
    .where('nfcID', '==', uid)
    .get()
    .then(snapshot => {
      if (snapshot.empty) {
        return;
      } else {
        return snapshot.docs[0]._data;
      }
    });
};

export const updateCoatCheck = async (hacker, number) => {
  return db
    .collection('hacker_info_2020')
    .doc(hacker)
    .update({
      coatCheck: number,
    });
};

export const watchEvents = async callback => {
  return db.collection('nfc_events').onSnapshot(snap => {
    let docs;
    try {
      docs = snap.docs;
    } catch (e) {
      return;
    }
    const all = docs
      .map(doc => doc.data())
      .sort((a, b) => (a.order > b.order ? 1 : a.order === b.order ? 0 : -1));
    const meals = docs
      .filter(doc => {
        return ['Lunch1', 'Lunch2', 'Breakfast', 'Dinner1'].includes(doc.id);
      })
      .map(doc => doc.data())
      .sort((a, b) => (a.order > b.order ? 1 : a.order === b.order ? 0 : -1));
    const workshops = docs
      .filter(
        doc => !['Lunch1', 'Lunch2', 'Breakfast', 'Dinner1'].includes(doc.id),
      )
      .map(doc => doc.data())
      .sort((a, b) => (a.order > b.order ? 1 : a.order === b.order ? 0 : -1));
    callback({all, meals, workshops});
  });
};

export const modifyEvent = async ({operation, event, hacker}) => {
  const op =
    operation === 'inc'
      ? firebase.firestore.FieldValue.increment(1)
      : operation === 'dec'
      ? firebase.firestore.FieldValue.increment(-1)
      : null;
  if (op === null) {
    throw new Error('Incorrect Operation');
  }

  db.collection('hacker_info_2020')
    .doc(hacker)
    .update({
      [`events.${event}.count`]: op,
    });
};
