import app from "./firebase";
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { getDatabase, update, ref, push } from 'firebase/database'
import md5 from "md5";

const auth = getAuth(app)
const db = getDatabase(app)

export const createUser = (email, password, name) => {
    return new Promise((resolve, reject) => {
        createUserWithEmailAndPassword(auth, email, password)
        .then(success => {
            const uid = success.user.uid;

            const path = ref(db, `users/${uid}`);

            const data = {
                name: name,
                email: email,
                password: md5(password),
                uid: uid
            }

            update(path, data)
            .then(success => {
                createContacts(uid)
                resolve()
            })
            .catch(error => {
                reject(error)
            })
        })
        .catch((error) => {
            const code = error.code;
            
            reject(code)
        })
    })
};

const createContacts = (uid) => {
    const list_contacts = [
        {
            name: 'Bianca mantovani',
            email: 'bianca@gmail.com',
            photo: 'https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png',
            age: 25
        },
        {
            name: 'Bruno Silva',
            email: 'bruno@gmail.com',
            photo: 'https://primefaces.org/cdn/primevue/images/avatar/onyamalimba.png',
            age: 20
        },
        {
            name: 'Leandro Scarpa',
            email: 'leandro@gmail.com',
            photo: 'https://primefaces.org/cdn/primevue/images/avatar/xuxuefeng.png',
            age: 62
        },
        {
            name: 'Sophia Soares',
            email: 'sophia@gmail.com',
            photo: 'https://primefaces.org/cdn/primevue/images/avatar/ionibowcher.png',
            age: 29
        }
    ]

    const path = ref(db, `users/${uid}/contacts`);

    list_contacts.forEach(contact => {
        push(path, contact);
    })
}

