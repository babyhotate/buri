setInterval(() => {
}, 1000);

fetch('http://localhost:3000/api/posts')
    .then(response => response.json())
    .then(data => console.log(data));