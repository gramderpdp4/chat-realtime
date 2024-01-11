import { initializeApp } from 'firebase/app'
 
const firebaseConfig = {
    apiKey: "AIzaSyDPjlz5Tfu8ZC27-SraIYKX1keIEsgCyl4",
    authDomain: "andre-projetos.firebaseapp.com",
    databaseURL: "https://andre-projetos-default-rtdb.firebaseio.com",
    projectId: "andre-projetos",
    storageBucket: "andre-projetos.appspot.com",
    messagingSenderId: "858004312998",
    appId: "1:858004312998:web:447dd20530eea88480f567"
}

const app = initializeApp(firebaseConfig)

export default app;