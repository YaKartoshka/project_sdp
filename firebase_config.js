const firebase=require('firebase/app');
require('firebase/auth');

const firebaseConfig = {
  apiKey: "AIzaSyBju-4uk4RN6Rqd_UQh9dVL6UfFSx1hKFU",
  authDomain: "sdp-project-c1402.firebaseapp.com",
  projectId: "sdp-project-c1402",
  storageBucket: "sdp-project-c1402.appspot.com",
  messagingSenderId: "1066253426881",
  appId: "1:1066253426881:web:8e73b8d684559f7098b440",
  measurementId: "G-C7SDY3Z2L0"
};


const FirebaseConfig = {
  start: () => firebase.initializeApp(firebaseConfig)
}


Object.freeze(FirebaseConfig)

FirebaseConfig.start(); 

module.exports=firebase; 