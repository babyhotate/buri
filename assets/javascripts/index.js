setInterval(() => {
    fetch('http://localhost:3000/api/posts')
        .then(response => response.json())
        .then(data => apple(data));
}, 5000);

// TODO: 関数の仕事が決まったら変えること
function apple(posts) {
    const ulElement = document.getElementById('posts');
    while (ulElement.firstChild) {
        ulElement.removeChild(ulElement.firstChild);

    }

    for (const post of posts.posts) {
        const li = document.createElement('li');
        li.textContent = post['user']['displayName'];

        const formForDelete = document.createElement('form');
        formForDelete.setAttribute('action', '/delete_post');
        formForDelete.setAttribute('method', 'get');

        const hiddenForDelete = document.createElement('input');
        hiddenForDelete.setAttribute('type', 'hidden');
        hiddenForDelete.setAttribute('value', '0');
        hiddenForDelete.setAttribute('id', 'post');
        hiddenForDelete.setAttribute('name', 'post_id');
        formForDelete.appendChild(hiddenForDelete);

        const submitForDelete = document.createElement('input');
        submitForDelete.setAttribute('type', 'submit');
        submitForDelete.setAttribute('value', '廃棄');
        formForDelete.appendChild(submitForDelete);

        li.appendChild(formForDelete);

        const formForEdit = document.createElement('form');
        formForEdit.setAttribute('action', '/edit_post');
        formForEdit.setAttribute('method', 'get');

        const textForEdit = document.createElement('input');
        textForEdit.setAttribute('type', 'text');
        textForEdit.setAttribute('value', post['message']);
        textForEdit.setAttribute('name', 'edit_content');
        formForEdit.appendChild(textForEdit);

        const hiddenForEdit = document.createElement('input');
        hiddenForEdit.setAttribute('type', 'hidden');
        hiddenForEdit.setAttribute('name_', '0');
        hiddenForEdit.setAttribute('id', 'post');
        hiddenForEdit.setAttribute('name', 'post_id');
        formForEdit.appendChild(hiddenForEdit);

        const submitForEdit = document.createElement('input');
        submitForEdit.setAttribute('type', 'submit');
        submitForEdit.setAttribute('value', '加工');
        formForEdit.appendChild(submitForEdit);

        li.appendChild(formForEdit);

        ulElement.appendChild(li);
    }
};
