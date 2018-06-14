import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import '../sass/Home.sass';


class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            api: "https://jsonplaceholder.typicode.com/posts",
            apiUsers: "https://jsonplaceholder.typicode.com/users",
            page: 1,
            perPage: 10,
            maxPage: 1,
            showNext: false
        };


        this.getPosts = this.getPosts.bind(this);
        this.updatePosts = this.updatePosts.bind(this);
        this.checkPagination = this.checkPagination.bind(this);
        this.initPagination = this.initPagination.bind(this);
    }

    componentWillMount() {
        this.checkPagination()
    }

    componentDidMount() {
        this.getPosts()
    }

    checkPagination() {
        if (this.props.match.params.page !== undefined) {
            this.setState({page: this.props.match.params.page})
        }
    }

    getPosts() {
        fetch(this.state.api)
            .then(response =>
                response.json().then(json => ({
                        status: response.status,
                        json
                    })
                ))
            .then(json => {
                this.setState({posts: json.json});
                localStorage.setItem("posts", JSON.stringify(json.json))
                this.initPagination()
            })
            .catch(e => {
                console.log(e);
                this.setState({posts : JSON.parse(localStorage.getItem("posts"))})
                this.initPagination()
            })
    }




    initPagination() {
        this.setState({maxPage: Math.ceil(this.state.posts.length / this.state.perPage)});

        if (this.state.maxPage > this.state.page && this.state.page > 0) {
            this.setState({showNext: true})
        } else {
            this.setState({page: this.state.maxPage})
            this.props.history.push(`/${this.state.page}`)
        }
    }

    updatePosts() {
        this.setState({page: ++this.state.page});
        this.props.history.push(`/${this.state.page}`)
        this.state.maxPage > this.state.page ? this.setState({showNext: true}) : this.setState({showNext: false})
    }

    render() {
        const posts = this.state.posts.slice(0, this.state.perPage * this.state.page).map((post, index) => (
            <div className="posts__item"
                 key={index}

            >
                <div className="posts__item-title">
                    {post.title}
                </div>
                <div className="post__item-link">
                    <Link to={"/post/" + post.id}>Detail</Link>
                </div>
            </div>
        ))
        return (
            <div className="App">
                Home
                <div className="posts">
                    {posts}
                    {this.state.showNext &&
                    <div className="posts__more">
                        <button
                            onClick={() => {
                                this.updatePosts()
                            }}
                        >
                            Show more
                        </button>
                    </div>
                    }

                </div>
            </div>
        );
    }
}

export default Home;
