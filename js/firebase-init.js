// Shared Firebase configuration and initialization
const firebaseConfig = {
  apiKey: "AIzaSyD0hp0wbDPAG2Cbs_K1pi1jBDWtW4PMUuk",
  authDomain: "vulcan-edfea.firebaseapp.com",
  projectId: "vulcan-edfea",
  storageBucket: "vulcan-edfea.firebasestorage.app",
  messagingSenderId: "906189775089",
  appId: "1:906189775089:web:7ce445936dfbc556778950",
  measurementId: "G-5GZYY5YKTB"
};

if (typeof firebase !== 'undefined' && !firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
if (typeof firebase !== 'undefined' && firebase.apps.length) {
  window.db = firebase.firestore();
}
