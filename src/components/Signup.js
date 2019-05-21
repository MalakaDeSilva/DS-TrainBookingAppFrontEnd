import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';
import Login from './Login';

import '../App.css';

class Signup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            phone: '',
            password: '',
            nic: '',
            type: ''
        }
    }

    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    signup = e => {
        e.preventDefault();

        const newUser = {
            name: this.state.name,
            email: this.state.email,
            phone: this.state.phone,
            password: this.state.password,
            nic: this.state.nic,
            type: this.state.type
        }

        Axios.post('endpoint', newUser)
            .then(response => {
                console.log(response);
                alert('Successfully registered.');
                ReactDOM.render(<Login />, document.getElementById('root'));
            })
            .catch(err => {
                console.log(err);
            });

        alert('One or more fields are empty.')

    }

    login() {
        ReactDOM.render(<Login />, document.getElementById('root'));
    }

    render() {
        const { name, email, phone, password, nic, type } = this.state;
        return (
            <div className="App">
                <form onSubmit={this.signup}>
                    Name :
                    <input type="text" placeholder="Name" value={name} onChange={this.changeHandler}></input>
                    <br />
                    Email :
                    <input type="Email" placeholder="Email Address" value={email} onChange={this.changeHandler}></input>
                    <br />
                    Phone :
                    <input type="text" placeholder="Phone Number" value={phone} onChange={this.changeHandler}></input>
                    <br />
                    Password :
                    <input type="Password" placeholder="Password" value={password} onChange={this.changeHandler}></input>
                    <br />
                    NIC :
                    <input type="text" placeholder="NIC" value={nic} onChange={this.changeHandler}></input>
                    <br />
                    Type :
                    <input type="text" placeholder="User Type" value={type} onChange={this.changeHandler}></input>
                    <br /><br />
                    <button type="submit">Sign Up</button>
                </form>
                <br /><br />
                Already have an account? <button type="submit" onClick={this.login}>Log in</button>
            </div>
        );
    }
}

export default Signup;