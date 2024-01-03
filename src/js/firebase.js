import { initializeApp } from 'firebase/app'
 
const firebaseConfig = {
    apiKey: "AIzaSyAvSzOfAjK1JsctB77C8WyUHwhLGUWZnsU",
    authDomain: "projetos-aprendizado-cf65c.firebaseapp.com",
    databaseURL: "https://projetos-aprendizado-cf65c-default-rtdb.firebaseio.com",
    projectId: "projetos-aprendizado-cf65c",
    storageBucket: "projetos-aprendizado-cf65c.appspot.com",
    messagingSenderId: "142471494784",
    appId: "1:142471494784:web:99e70bed911d280359fa65"
}

const app = initializeApp(firebaseConfig)

export default app;