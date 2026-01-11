import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";
import { getFirestore, collection, addDoc, deleteDoc, doc, query, orderBy, onSnapshot, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js";

const firebaseConfig = {apiKey:"AIzaSyB0DJHhalzqQVdAq7cSj862S23r4JYX6fY",authDomain:"sinop-private-share.firebaseapp.com",projectId:"sinop-private-share",storageBucket:"sinop-private-share.firebasestorage.app",messagingSenderId:"365312486932",appId:"1:365312486932:web:9c50760cbb08f99d8d4101"};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

let unsubscribe;

window.login = async () => {
    const email = document.getElementById('email').value;
    const pass = document.getElementById('password').value;
    try { await signInWithEmailAndPassword(auth, email, pass); } 
    catch (error) { document.getElementById('auth-msg').innerText = "Hata: " + error.message; }
};

window.logout = () => {
    if (unsubscribe) { unsubscribe(); unsubscribe = null; }
    signOut(auth);
};

onAuthStateChanged(auth, (user) => {
    if (user) {
        document.getElementById('login-screen').classList.add('hidden');
        document.getElementById('app-screen').classList.remove('hidden');
        listenData();
    } else {
        document.getElementById('login-screen').classList.remove('hidden');
        document.getElementById('app-screen').classList.add('hidden');
        if (unsubscribe) { unsubscribe(); unsubscribe = null; }
    }
});

window.shareData = async () => {
    const textInput = document.getElementById('note-input');
    const text = textInput.value;
    
    if (!text.trim()) return;

    try {
        await addDoc(collection(db, "shares"), {
            text: text,
            createdAt: serverTimestamp(),
            user: auth.currentUser.email
        });
        textInput.value = ""; 
    } catch (e) {
        alert("Hata: " + e.message);
    }
};

window.deleteNote = async (id) => {
    if(confirm("Bu notu silmek istediğine emin misin?")) {
        try {
            await deleteDoc(doc(db, "shares", id));
        } catch (error) {
            console.error(error);
            alert("Silerken bir hata oldu.");
        }
    }
};

function listenData() {
    if (unsubscribe) { unsubscribe(); }

    const q = query(collection(db, "shares"), orderBy("createdAt", "desc"));
    
    unsubscribe = onSnapshot(q, (snapshot) => {
        const feed = document.getElementById('feed');
        feed.innerHTML = "";
        snapshot.forEach((doc) => {
            const data = doc.data();
            const id = doc.id;
            
            let processedText = data.text ? data.text
                .replace(/</g, "&lt;").replace(/>/g, "&gt;") 
                .replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank">$1</a>') : '';

            const item = `
                <div class="bg-slate-800 p-4 rounded-xl shadow border border-slate-700 relative group">
                    <p class="whitespace-pre-wrap text-slate-200 link-text text-lg pr-8">${processedText}</p>
                    
                    <div class="flex justify-between items-center mt-3 border-t border-slate-700 pt-2">
                        <span class="text-xs text-slate-500">
                            ${data.createdAt ? new Date(data.createdAt.seconds * 1000).toLocaleString('tr-TR') : '...'}
                        </span>
                        
                        <button onclick="deleteNote('${id}')" class="text-slate-600 hover:text-red-500 transition p-1" title="Sil">
                            <i class="fas fa-trash-alt"></i>
                        </button>
                    </div>
                </div>
            `;
            feed.innerHTML += item;
        });
    }, (error) => {
        console.log(error.code);
    });
}
