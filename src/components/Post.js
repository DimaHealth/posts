import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import '../sass/Post.sass';



class Post extends Component {
    constructor(props){
        super(props)
        this.state = {
            currentId: this.props.match.params.number,
            post: {},
            api: "https://jsonplaceholder.typicode.com/posts",
        };
    }
    componentWillMount() {
        this.getPost()
    }
    getPost() {
        fetch(this.state.api+'/' + this.state.currentId)
            .then(response => response.json())
            .then(json => {
                this.setState({post: json});
                console.log(this.state.post);

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
            <div className="post__user">
                <Link to={`/user/${this.state.post.userId}`}>About User</Link>
            </div>
      </div>
    );
  }
}

export default Post;
