import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyChcjPY7mrfSPUHFMiLK3-BCqPDnyN7U_I",
  authDomain: "project-60794.firebaseapp.com",
  projectId: "project-60794",
  storageBucket: "project-60794.firebasestorage.app",
  messagingSenderId: "443803014572",
  appId: "1:443803014572:web:9e9ca774ac69a7f30e5609",
  measurementId: "G-J8QL3Y4CLW"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const form = document.getElementById('messageForm');
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const recipientName = document.getElementById('recipientName').value.trim();
    const messageInput = document.getElementById('messageInput').value.trim();

    if (!recipientName || !messageInput) {
        alert("Both fields are required!");
        return;
    }

    try {
        await addDoc(collection(db, "messages"), {
            recipient: recipientName,
            text: messageInput,
            timestamp: new Date()
        });
        alert('Message submitted!');
        form.reset();
    } catch (err) {
        console.error('Error adding message:', err);
    }
});
