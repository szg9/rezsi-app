import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
// Készítsd el a saját config.js fájlodat a config.example.js fájl alapján
import firebaseConfig from './firebase/config';
import db from './firebase/db';
import rezsiAdatok from "./firebase/rezsiAdatok";

firebase.initializeApp(firebaseConfig);

/*
const db = firebase.firestore(); */

firebase
  .auth()
  .signInAnonymously()
  .then(() => {
    console.log('signed in');
  })
  .catch((error) => {
    console.error(error);
  });

firebase.auth().onAuthStateChanged(async (user) => {
  const promises = [];
  if (user) {
    rezsiAdatok.forEach((rezsiAdat, index) => {
      const writePromise = db.collection('haviAdatok')
        .doc(index + "")
        .set(rezsiAdat)
        .then(() => {
          console.log('Document written');
        })
        .catch((error) => {
          console.error('Error adding document: ', error);
        });
      promises.push(writePromise);
    });
    Promise.all(promises).then(() => {
      process.exit(0);
    });
  }
});
