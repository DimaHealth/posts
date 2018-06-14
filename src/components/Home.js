import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../sass/Home.sass';



class Home extends Component {
    constructor(props) {
        super(props);
        this.state = { posts: [], api: "https://jsonplaceholder.typicode.com/posts"};


        // this.press = this.press.bind(this);

        console.log("constructor");
    }
    // componentWillReceiveProps(nextProps) {
    //     console.log("componentWillReceiveProps()");
    // }
    componentWillMount(){
        console.log("componentWillMount()");

    }
    componentDidMount(){
        console.log("componentDidMount()");
        fetch(this.state.api)
            .then(response => response.json())
            .then(json => {
                this.setState({posts : json});
                console.log(this.state.posts);
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
  render() {
      const posts = this.state.posts.map((post, index) => (
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
                  <Link to={"/post/" + post.id} >Detail</Link>
              </div>
          </div>
      ))
      // const posts =  this.state.posts.map(function(el) {
      //     return <Contact
      //         key={el.id}
      //         userid={el.userid}
      //         title={el.title}
      //         body={el.body}
      //     />;
      // })
      // const posts = this.state.posts.map((item, index) => {
      //     return <li key={index}>{item}</li>;
      // });
    return (
      <div className="App">
            Home
          <div className="posts">
              {posts}

          </div>
      </div>
    );
  }
}

export default Home;
