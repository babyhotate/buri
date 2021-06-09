setInterval(() => {
}, 1000);

// TODO: 関数の仕事が決まったら変えること
function apple(posts) {
    console.log(posts);

    // TODO: 要らなくなったら消すこと
    const answer = confirm("DOMを更新してもいいですか？");
    console.log("🍣", answer);
    if (!answer) {
        return;
    }

    const ulElement = document.getElementById('posts');
    while (ulElement.firstChild) {
        ulElement.removeChild(ulElement.firstChild);
    }

};

fetch('http://localhost:3000/api/posts')
    .then(response => response.json())
    .then(data => apple(data));