import React, {Component} from 'react';
import '../sass/User.sass';


class User extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentId: this.props.match.params.number,
            user: {},
            api: "https://jsonplaceholder.typicode.com/users",
        };
    }

    componentWillMount() {
        this.getUser()
    }

    getUser() {
        fetch(this.state.api + '/' + this.state.currentId)
            .then(response => response.json())
            .then(json => {
                this.setState({user: json});
                console.log(this.state.user);

            })
            .catch(e => {
                this.setState({user: JSON.parse(localStorage.getItem("users"))[this.state.currentId - 1]})
            })
    }

    render() {
        return (
            <div className="user">
                <div className="user__name">
                    {this.state.user.name}
                </div>
                <div className="user__email">
                    <a className="button-dec" href={'mailto:' + this.state.user.email}>{this.state.user.email}</a>
                </div>
                <div className="user__website">
                    <a className="button-dec" href={'http://' + this.state.user.website}>Website</a>
                </div>
            </div>
        );
    }
}

export default User;
