tinymce.init({
    selector: 'textarea',
    plugins: 'lists link image table code',
    toolbar: 'undo redo | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | code',
    menubar: false
});

const loginForm = document.getElementById('loginForm');
const adminSection = document.getElementById('adminSection');
const loginSection = document.getElementById('loginSection');

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Simple authentication (replace with a secure method)
    if (username === 'admin' && password === 'password') {
        loginSection.style.display = 'none';
        adminSection.style.display = 'block';
    } else {
        alert('Invalid credentials');
    }
});

const saveCVButton = document.getElementById('saveCV');
saveCVButton.addEventListener('click', () => {
    const photoUrl = document.getElementById('photoInput').value;
    const description = tinymce.get('descriptionInput').getContent();
    const achievements = tinymce.get('achievementsInput').getContent().split(',');

    document.getElementById('myPhoto').src = photoUrl;
    document.getElementById('description').innerHTML = description;
    const achievementsList = document.getElementById('achievements');
    achievementsList.innerHTML = '';
    achievements.forEach(achievement => {
        const li = document.createElement('li');
        li.innerHTML = achievement;
        achievementsList.appendChild(li);
    });
});

const newPostForm = document.getElementById('newPostForm');
const adminBlogPosts = document.getElementById('adminBlogPosts');

newPostForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('postTitle').value;
    const content = tinymce.get('postContent').getContent();
    const postElement = document.createElement('div');
    postElement.innerHTML = `<h3>${title}</h3><p>${content}</p><button onclick="deletePost(this)">Delete</button>`;
    adminBlogPosts.appendChild(postElement);
});

function deletePost(button) {
    const post = button.parentElement;
    adminBlogPosts.removeChild(post);
}
