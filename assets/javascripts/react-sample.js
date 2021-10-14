'use strict';

class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = { posts: []};
    fetch('http://localhost:3000/api/posts')
        .then(response => response.json())
        .then(data => {
          // console.log(data.posts);
          this.setState({posts: data.posts});
        });
    console.log(new Date().getTime())
  }

  handleEditClick = (e) => {
    // 投稿更新APIを実行する
    // postsを再取得する
    console.log('Edit: ', e.currentTarget.getAttribute('data-post'))
  }

  handleDeleteClick = (e) => {
    // 投稿削除APIを実行する
    // postsを再取得する
    console.log('Delete: ', e.currentTarget.getAttribute('data-post'))
  }

  render() {
    return this.state.posts.map((post, i) => {
       return <li key={i}>
                {post.user.displayName}
                <input type="text" name="edit_content" defaultValue={post.message} />
                <input type="button" value="編集" onClick={this.handleEditClick} data-post={post} />
                <input type="button" value="削除" onClick={this.handleDeleteClick} data-post={post} />
              </li>
      }
    );
  }
}

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      users: [{id: 1, displayName: 'tanaka'}, {id: 2, displayName: 'suzuki'}],
      inputUserId: '',
      inputValue: ''
    };
  }

  handleUserChange = (e) => {
    this.setState({inputUserId: e.target.value});
    // console.log(this.state)
  }

  handleInputChange = (e) => {
    this.setState({inputValue: e.target.value});
    // console.log(this.state)
  }

  handleSend = (e) => {
    console.log(this.state)
    // 投稿追加APIを実行する
    // Postsを再レンダリングする（？）
  }

  render() {
    return <div>
              <select name="user" id="user-select" onChange={this.handleUserChange}>
                {this.state.users.map(user => <option key={user.id} value={user.id}>{user.displayName}</option>)}
              </select>
              <input
                type="text"
                id="post"
                name="post"
                required
                minLength="1"
                maxLength="1000"
                size="30"
                onChange={this.handleInputChange}
              />
              <input type="button" onClick={this.handleSend} value="送信" />
            </div>
  }
}

const e = React.createElement;

const pageTitleDomContainer = document.querySelector('#title');
ReactDOM.render(<h1>buri</h1>, pageTitleDomContainer);

const postsDomContainer = document.querySelector('#posts');
ReactDOM.render(e(Posts), postsDomContainer);

const inputDomContainer = document.querySelector('#input');
ReactDOM.render(e(Input), inputDomContainer);

//MEMO: Reactチュートのソース見て、今の実装正しいか確認する