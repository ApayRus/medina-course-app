// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getStorage, getDownloadURL, ref } from 'firebase/storage'

// import { getAnalytics } from 'firebase/analytics'
import firebaseConfig from './config'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Initialize Firebase
const app = initializeApp(firebaseConfig)
// const analytics = getAnalytics(app);
const storage = getStorage(app)

export { storage }
