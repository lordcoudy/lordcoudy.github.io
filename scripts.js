document.getElementById('viewCV').addEventListener('click', () => {
    document.getElementById('cvSection').style.display = 'block';
    document.getElementById('blogSection').style.display = 'none';
});

document.getElementById('viewBlog').addEventListener('click', () => {
    document.getElementById('cvSection').style.display = 'none';
    document.getElementById('blogSection').style.display = 'block';
});

// Sample blog posts (replace with dynamic content if necessary)
const blogPosts = [
    { title: "Post 1", content: "This is the content of post 1" },
    { title: "Post 2", content: "This is the content of post 2" }
];

const blogSection = document.getElementById('blogPosts');
blogPosts.forEach(post => {
    const postElement = document.createElement('div');
    postElement.innerHTML = `<h3>${post.title}</h3><p>${post.content}</p>`;
    blogSection.appendChild(postElement);
});
