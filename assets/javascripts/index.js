fetch('http://localhost:3000/api/posts')
        .then(response => response.json())
        .then(data => apple(data));

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

        const formForEdit = document.createElement('form');
        formForEdit.setAttribute('action', '/edit_post');
        formForEdit.setAttribute('method', 'get');
        formForEdit.setAttribute('style', 'display: inline');

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

        // URLが含まれていたらOGP取得して要素追加
        if(containsURL(post['message'])) {
            createOgpElementFor(li, post['message']);
        }
        
        const formForDelete = document.createElement('form');
        formForDelete.setAttribute('action', '/delete_post');
        formForDelete.setAttribute('method', 'get');
        formForDelete.setAttribute('style', 'display: inline');

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

        ulElement.appendChild(li);
    }
};

function containsURL(str) {
    const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
};

function createOgpElementFor(li, url) {
    // サーバへ送りたいデータ
    const data = { url: url};
    // FetchAPIのオプション準備
    const param  = {
    method: "POST",
    headers: {
        "Content-Type": "application/json; charset=utf-8"
    },
    // リクエストボディ
    body: JSON.stringify(data)
    };
    fetch('http://localhost:3000/api/ogp', param)
        .then(response => response.json())
        .then(data => {
            const divForOgpTitle = document.createElement('div');
            divForOgpTitle.setAttribute('id', 'ogp_title');
            divForOgpTitle.textContent = data.ogp.title;
            const divForOgpDes = document.createElement('div');
            divForOgpDes.setAttribute('id', 'ogp_des');
            divForOgpDes.textContent = data.ogp.description;
            const imgForOgpImg = document.createElement('img');
            imgForOgpImg.setAttribute('id', 'ogp_img');
            imgForOgpImg.setAttribute('src', data.ogp.image);
            imgForOgpImg.setAttribute('width', '300px');

            li.appendChild(divForOgpTitle);
            li.appendChild(divForOgpDes);
            li.appendChild(imgForOgpImg);
        });
};
