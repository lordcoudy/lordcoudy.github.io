// Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const db = firebase.firestore();
const storage = firebase.storage();

document.getElementById('viewCV').addEventListener('click', () => {
    document.getElementById('cvSection').style.display = 'block';
    document.getElementById('blogSection').style.display = 'none';
});

document.getElementById('viewBlog').addEventListener('click', () => {
    document.getElementById('cvSection').style.display = 'none';
    document.getElementById('blogSection').style.display = 'block';
});

function fetchCVPhoto() {
    const cvPhoto = document.getElementById('myPhoto');

    // Create a reference to the image in Firebase Storage
    const storageRef = storage.ref();
    const photoRef = storageRef.child('profile.jpg');

    // Get the download URL for the image
    photoRef.getDownloadURL()
        .then((url) => {
            // Update the image element's src attribute with the download URL
            cvPhoto.src = url;
        })
        .catch((error) => {
            console.error('Error getting CV photo:', error);
        });
}

// Call the fetchCVPhoto function to fetch and display the CV photo
fetchCVPhoto();

// Fetch CV data
db.collection('cv').doc('main').get().then((doc) => {
    if (doc.exists) {
        const data = doc.data();
        // document.getElementById('myPhoto').src = data.photo;
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
