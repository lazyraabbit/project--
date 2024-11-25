import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";

// Firebase Config
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Form Submission
const form = document.getElementById('messageForm');
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const messageInput = document.getElementById('messageInput').value;

    try {
        await addDoc(collection(db, "messages"), { text: messageInput });
        alert('Message submitted!');
        form.reset();
        loadMessages(); // Reload messages
    } catch (err) {
        console.error('Error adding message:', err);
    }
});

// Load Messages
async function loadMessages() {
    const messagesDiv = document.getElementById('messages');
    messagesDiv.innerHTML = ''; // Clear existing messages

    try {
        const querySnapshot = await getDocs(collection(db, "messages"));
        querySnapshot.forEach((doc) => {
            const message = doc.data().text;
            const messageDiv = document.createElement('div');
            messageDiv.className = 'message';
            messageDiv.textContent = message;
            messagesDiv.appendChild(messageDiv);
        });
    } catch (err) {
        console.error('Error fetching messages:', err);
    }
}

// Initial Load
loadMessages();
