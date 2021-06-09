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

    const li = document.createElement('li');
    li.textContent = 'nakanoh';

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
    textForEdit.setAttribute('value', 'あああ');
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

    // <li>
    //   nakanoh
    //   <form action="/delete_post" method="get">
    //     <input type="hidden" value="0" id="post" name="post_id">
    //     <input type="submit" value="廃棄">
    //   </form>
    //   <form action="/edit_post" method="get">
    //     <input type="text" name="edit_content" value="あああ">
    //     <input type="hidden" value="0" name="post_id">
    //     <input type="submit" value="加工">
    //   </form>
    // </li>
};

fetch('http://localhost:3000/api/posts')
    .then(response => response.json())
    .then(data => apple(data));