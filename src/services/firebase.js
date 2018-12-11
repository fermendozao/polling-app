import firebase from "firebase"
import "firebase/firestore"

const config = {
  apiKey: "AIzaSyASB1zh7wCYrkWoWRgHKTYZOvCNPp86Y9o",
  authDomain: "poll-app-3aaea.firebaseapp.com",
  databaseURL: "https://poll-app-3aaea.firebaseio.com",
  projectId: "poll-app-3aaea",
  storageBucket: "poll-app-3aaea.appspot.com",
  messagingSenderId: "481123099780"
};

class Firebase {
  constructor() {
    firebase.initializeApp(config);
    this.store = firebase.firestore;
    this.auth = firebase.auth;
  }

  get polls() {
    return this.store().collection('polls');
  }
}

export default new Firebase();