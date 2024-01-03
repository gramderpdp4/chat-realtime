import app from "./firebase";
import { signInWithEmailAndPassword, getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

const auth = getAuth(app);

const signInUser = (email, password) => {
    return new Promise((resolve, reject) => {
        signInWithEmailAndPassword(auth, email, password)
        .then(success => {
            resolve({ uid: success.user.uid })
        })
        .catch(error => {
            reject(error)
        })
    })
}

const userUID = () => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (output) => {
        if(output) resolve(output)
        else reject(null)
    })
  })
}

const logout = () => {
    signOut(auth)
}


export { signInUser, userUID, logout }