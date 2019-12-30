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

export const watchUser = callback => {
  auth.onAuthStateChanged(user => {
    if (!user) {
      callback({success: false, email: null});
      return;
    }
    const {email} = user;
    callback({success: true, email});
  });
};

export const watchHackers = callback => {
  db.collection('hacker_info_2020').onSnapshot(callback);
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
  db.collection('nfc_devices')
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
  await GoogleSignin.revokeAccess();
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
    return auth.signInWithCredential(credential);
  } catch (e) {
    return false;
  }
};
