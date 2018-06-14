import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import '../sass/Home.sass';


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            api: "https://jsonplaceholder.typicode.com/posts",
            page: 1,
            perPage: 10,
            maxPage: 1,
            showNext: false
        };


        this.getPosts = this.getPosts.bind(this);
        this.updatePosts = this.updatePosts.bind(this);
        this.checkPagination = this.checkPagination.bind(this);

        console.log("constructor");
    }

    // componentWillReceiveProps(nextProps) {
    //     console.log("componentWillReceiveProps()");
    // }
    componentWillMount() {
        console.log("componentWillMount()");
        this.checkPagination()
    }

    componentDidMount() {
        console.log("componentDidMount()");

        this.getPosts()

    }
    checkPagination(){
        if(this.props.match.params.page !== undefined){
            this.setState({page: this.props.match.params.page})
        }
    }
    getPosts() {
        fetch(this.state.api)
            .then(response => response.json())
            .then(json => {
                this.setState({posts: json});
                this.setState({maxPage: Math.ceil(this.state.posts.length / this.state.perPage)});

                if (this.state.maxPage > this.state.page) {
                    this.setState({showNext: true})
                }else{
                    this.setState({page: this.state.maxPage})
                    this.props.history.push(`/${this.state.page}`)
                }
            })
    }

    // componentWillUnmount(){
    //     console.log("componentWillUnmount()");
    // }
    // shouldComponentUpdate(){
    //     console.log("shouldComponentUpdate()");
    //     return true;
    // }
    // componentWillUpdate(){
    //     console.log("componentWillUpdate()");
    // }
    // componentDidUpdate(){
    //     console.log("componentDidUpdate()");
    // }
    // // press(){
    //     var className = (this.state.class==="off")?"on":"off";
    //     this.setState({class: className});
    // }
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
                <div className="posts__item-desc">
                    {post.body}

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
