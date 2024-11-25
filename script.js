import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-firestore.js";

// Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyChcjPY7mrfSPUHFMiLK3-BCqPDnyN7U_I",
  authDomain: "project-60794.firebaseapp.com",
  projectId: "project-60794",
  storageBucket: "project-60794.firebasestorage.app",
  messagingSenderId: "443803014572",
  appId: "1:443803014572:web:9e9ca774ac69a7f30e5609",
  measurementId: "G-J8QL3Y4CLW"
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
