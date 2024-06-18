// Firebase configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAcmkP-CIL20WEmhExarIvdKSz5rSfMOic",
    authDomain: "savva-balashov.me",
    projectId: "savva-balashov",
    storageBucket: "savva-balashov.appspot.com",
    messagingSenderId: "898187265023",
    appId: "1:898187265023:web:bc28fc914b84a0b3791dca",
    measurementId: "G-2TQJ5L2KNL"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// TinyMCE initialization
tinymce.init({
    selector: 'textarea',
    plugins: 'lists link image table code',
    toolbar: 'undo redo | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | code',
    menubar: false
});

document.getElementById('viewCV').addEventListener('click', () => {
    document.getElementById('cvSection').style.display = 'block';
    document.getElementById('blogSection').style.display = 'none';
});

document.getElementById('viewBlog').addEventListener('click', () => {
    document.getElementById('cvSection').style.display = 'none';
    document.getElementById('blogSection').style.display = 'block';
});

// Login modal
const modal = document.getElementById("loginModal");
const span = document.getElementsByClassName("close")[0];

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Login functionality
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            modal.style.display = "none";
            document.getElementById('adminSection').style.display = 'block';
        })
        .catch((error) => {
            alert('Invalid credentials');
        });
});

// Fetch CV data
db.collection('cv').doc('main').get().then((doc) => {
    if (doc.exists) {
        const data = doc.data();
        document.getElementById('myPhoto').src = data.photo;
        document.getElementById('description').innerHTML = data.description;
        const achievementsList = document.getElementById('achievements');
        achievementsList.innerHTML = '';
        data.achievements.forEach(achievement => {
            const li = document.createElement('li');
            li.innerHTML = achievement;
            achievementsList.appendChild(li);
        });
    }
});

// Fetch blog posts
db.collection('blog').get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        const post = doc.data();
        const postElement = document.createElement('div');
        postElement.innerHTML = `<h3>${post.title}</h3><p>${post.content}</p>`;
        document.getElementById('blogPosts').appendChild(postElement);
    });
});

// Save CV data
document.getElementById('saveCV').addEventListener('click', () => {
    const photoUrl = document.getElementById('photoInput').value;
    const description = tinymce.get('descriptionInput').getContent();
    const achievements = tinymce.get('achievementsInput').getContent().split(',');

    db.collection('cv').doc('main').set({
        photo: photoUrl,
        description: description,
        achievements: achievements
    })
        .then(() => {
            alert('CV updated successfully');
        })
        .catch((error) => {
            alert('Error updating CV: ', error);
        });
});

// Add new blog post
document.getElementById('newPostForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('postTitle').value;
    const content = tinymce.get('postContent').getContent();

    db.collection('blog').add({
        title: title,
        content: content
    })
        .then((docRef) => {
            alert('Blog post added successfully');
        })
        .catch((error) => {
            alert('Error adding blog post: ', error);
        });
});
