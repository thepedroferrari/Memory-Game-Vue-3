import firebase from "firebase/app"
import "firebase/firestore"

const config = {
  apiKey: process.env.VUE_APP_APIKEY,
  authDomain: process.env.VUE_APP_AUTHDOMAIN,
  databaseURL: process.env.VUE_APP_DBURL,
  projectId: process.env.VUE_APP_PID,
  storageBucket: process.env.VUE_APP_SB,
  messagingSenderId: process.env.VUE_APP_MSID,
  appId: process.env.VUE_APP_APPID,
}

firebase.initializeApp(config)

export const db = firebase.firestore()
export const leaderboardRef = db.collection("leaderboard")
export default firebase
