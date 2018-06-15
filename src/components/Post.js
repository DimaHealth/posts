import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import '../sass/Post.sass';


class Post extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentId: this.props.match.params.number,
            post: {},
            user: {},
            api: "https://jsonplaceholder.typicode.com/posts",
            apiUsers: "https://jsonplaceholder.typicode.com/users",
        };

        this.getUsers = this.getUsers.bind(this);
        this.getPost = this.getPost.bind(this);

    }

    componentWillMount() {
        this.getPost()
        this.getUsers()
    }

    getPost() {
        fetch(this.state.api + '/' + this.state.currentId)
            .then(response =>
                response.json().then(json => ({
                        status: response.status,
                        json
                    })
                ))
            .then(json => {
                this.setState({post: json.json});
                if (this.state.post) {
                    this.getUserInfo()
                }
            })
            .catch(e => {
                console.log(e);
                this.setState({post: JSON.parse(localStorage.getItem("posts"))[this.state.currentId - 1]})
                this.getUserInfo()
                console.log(this.state.post);
            })
    }

    getUsers() {
        fetch(this.state.apiUsers)
            .then(response =>
                response.json().then(json => ({
                        status: response.status,
                        json
                    })
                ))
            .then(json => {
                localStorage.setItem("users", JSON.stringify(json.json))
            })
            .catch(e => {
                console.log(e);
            })
    }

    getUserInfo() {
        fetch(this.state.apiUsers + '/' + this.state.post.userId)
            .then(response =>
                response.json().then(json => ({
                        status: response.status,
                        json
                    })
                ))
            .then(json => {
                this.setState({user: json.json});
            })
            .catch(e => {
                console.log(e);
                this.setState({user: JSON.parse(localStorage.getItem("users"))[this.state.post.userId - 1] })
            })
    }

    render() {
        return (
            <div className="post">
                <div className="post__title">
                    {this.state.post.title}
                </div>
                <div className="post__desc">
                    {this.state.post.body}
                </div>
                <div className="post__user button-det">
                    <Link to={`/user/${this.state.post.userId}`}>{this.state.user.name}</Link>
                </div>
            </div>
        );
    }
}

export default Post;
