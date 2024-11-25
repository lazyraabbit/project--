import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
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
