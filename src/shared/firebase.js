import * as firebase from "firebase/app";
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyC8K0wRxtORAmVzvAthkM3z0E5mZeOPIG4",
  authDomain: "redfox-ed521.firebaseapp.com",
  databaseURL: "https://redfox-ed521.firebaseio.com",
  projectId: "redfox-ed521",
  storageBucket: "redfox-ed521.appspot.com",
  messagingSenderId: "959843222129",
  appId: "1:959843222129:web:c6f77f966b52f66aad11d0",
  measurementId: "G-YG43JLXBFP"
}

firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()
const auth = firebase.auth()

const usersCollection = db.collection('users')


export {
  db,
  auth,
  usersCollection
}


