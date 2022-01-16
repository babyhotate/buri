'use strict';

/*
 * 投稿一覧画面
 */
class PostsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { posts: [] };
        this.updatePosts = this.updatePosts.bind(this);
    }

    updatePosts = () => {
        fetch('http://localhost:3000/api/posts')
            .then((response) => response.json())
            .then((data) => {
                this.setState({ posts: data.posts });
            })
            .catch((error) => console.log(error));
    };

    render() {
        return (
            <div>
                <h1>buri</h1>
                <Posts
                    posts={this.state.posts}
                    callbackUpdatePosts={this.updatePosts}
                />
                <Form callbackUpdatePosts={this.updatePosts} />
            </div>
        );
    }
}

/*
 * 投稿一覧
 */
class Posts extends React.Component {
    constructor(props) {
        super(props);
        this.state = { changedPostMessages: {} };

        // 投稿一覧を1秒おきに最新化する
        setInterval(() => {
            this.props.callbackUpdatePosts();
        }, 1000);
    }

    handlePostMessageChange = (e) => {
        const postId = Number(e.currentTarget.getAttribute('data-post-id'));
        // 編集中の投稿内容を保持する
        this.state.changedPostMessages[postId] = e.target.value;
    };

    handleEditClick = (e) => {
        // 投稿更新APIを実行する
        const postId = Number(e.currentTarget.getAttribute('data-post-id'));
        fetch('http://localhost:3000/api/posts', {
            method: 'PATCH',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                post_id: postId,
                edit_content: this.state.changedPostMessages[postId],
            }),
        })
            .then((response) =>
                response.json().then((json) => console.log(json))
            )
            .catch((error) => console.log(error));
    };

    handleDeleteClick = (e) => {
        // 投稿削除APIを実行する
        const postId = e.currentTarget.getAttribute('data-post-id');
        fetch(`http://localhost:3000/api/posts/${postId}`, {
            method: 'DELETE',
        })
            .then((response) => {
                // 投稿削除後に投稿一覧を最新化する
                this.props.callbackUpdatePosts();
            })
            .catch((error) => console.log(error));
    };

    render() {
        return (
            <ul>
                {this.props.posts.map((post, i) => {
                    return (
                        <li id={post.id} key={post.id}>
                            {post.user.displayName}
                            <input
                                type="text"
                                name="edit_content"
                                defaultValue={post.message}
                                onChange={this.handlePostMessageChange}
                                data-post-id={String(post.id)}
                            />
                            <input
                                type="button"
                                value="編集"
                                onClick={this.handleEditClick}
                                data-post-id={String(post.id)}
                            />
                            <input
                                type="button"
                                value="削除"
                                onClick={this.handleDeleteClick}
                                data-post-id={String(post.id)}
                            />
                        </li>
                    );
                })}
            </ul>
        );
    }
}

/*
 * 送信フォーム
 */
class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            inputUserId: 0,
            inputValue: '',
        };
        this.getUsers();
    }

    getUsers = () => {
        // 全ユーザ情報リスト取得APIを実行してthis.state.usersに設定する
        fetch('http://localhost:3000/api/users')
            .then((response) => response.json())
            .then((data) => {
                this.setState({ users: data.users });
                this.setState({ inputUserId: data.users[0].id });
            })
            .catch((error) => console.log(error));
    };

    handleUserChange = (e) => {
        // 選択中のユーザIDを保持する
        this.setState({ inputUserId: e.target.value });
    };

    handleInputChange = (e) => {
        this.setState({ inputValue: e.target.value });
    };

    handleSend = (e) => {
        // 投稿追加APIを実行する
        fetch('http://localhost:3000/api/posts', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                user: this.state.inputUserId,
                post: this.state.inputValue,
            }),
        })
            .then((response) => {
                // 投稿送信後に投稿一覧を最新化する
                this.props.callbackUpdatePosts();
                // 送信後にメッセージ入力欄を空にする
                const inputAreaEle = document.getElementById('input-area');
                inputAreaEle.value = '';
            })
            .catch((error) => console.log(error));
    };

    render() {
        return (
            <div>
                <select
                    name="user"
                    id="user-select"
                    onChange={this.handleUserChange}
                >
                    {this.state.users.map((user) => (
                        <option key={user.id} value={user.id}>
                            {user.displayName}
                        </option>
                    ))}
                </select>
                <input
                    type="text"
                    id="input-area"
                    name="input-area"
                    required
                    minLength="1"
                    maxLength="1000"
                    size="30"
                    onChange={this.handleInputChange}
                />
                <input type="button" onClick={this.handleSend} value="送信" />
            </div>
        );
    }
}

const e = React.createElement;

const postsDomContainer = document.querySelector('#posts');
ReactDOM.render(e(PostsPage), postsDomContainer);
