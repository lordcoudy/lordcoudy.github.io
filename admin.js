// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAcmkP-CIL20WEmhExarIvdKSz5rSfMOic",
    authDomain: "savva-balashov.firebaseapp.com",
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
    license_key: 'gpl',
    plugins: 'lists link image table code',
    toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | link image | code',
    menubar: false
});

// Login functionality
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            document.getElementById('loginSection').style.display = "none";
            document.getElementById('adminSection').style.display = "block";
        })
        .catch((error) => {
            alert('Invalid credentials');
        });
});

// Fetch CV data for editing
auth.onAuthStateChanged(user => {
    if (user) {
        db.collection('cv').doc('main').get().then((doc) => {
            if (doc.exists) {
                const data = doc.data();
                document.getElementById('photoInput').value = data.photo;
                tinymce.get('descriptionInput').setContent(data.description);
                tinymce.get('achievementsInput').setContent(data.achievements.join(', '));
            }
        });

        // Fetch blog posts for editing
        db.collection('blog').get().then((querySnapshot) => {
            const adminBlogPosts = document.getElementById('adminBlogPosts');
            adminBlogPosts.innerHTML = '';
            querySnapshot.forEach((doc) => {
                const post = doc.data();
                const postElement = document.createElement('div');
                postElement.innerHTML = `<h3>${post.title}</h3><p>${post.content}</p>`;
                adminBlogPosts.appendChild(postElement);
            });
        });
    }
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
