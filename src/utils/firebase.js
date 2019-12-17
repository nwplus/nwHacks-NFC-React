import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import analytics from '@react-native-firebase/analytics';

export const db = firestore();
export const Auth = auth();
export const Analytics = analytics();
