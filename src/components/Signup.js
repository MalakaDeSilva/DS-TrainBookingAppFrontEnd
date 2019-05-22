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

        Axios.post('localhost:3000/users/', newUser)
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
                <h1>Train Booking System</h1>
                <form onSubmit={this.signup}>
                    <table>
                        <tr>
                            <td>
                                Name :
                            </td>
                            <td>
                                <input type="text" placeholder="Name" value={name} onChange={this.changeHandler}></input>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Email :
                            </td>
                            <td>
                                <input type="Email" placeholder="Email Address" value={email} onChange={this.changeHandler}></input>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Phone :
                            </td>
                            <td>
                                <input type="text" placeholder="Phone Number" value={phone} onChange={this.changeHandler}></input>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Password :
                            </td>
                            <td>
                                <input type="Password" placeholder="Password" value={password} onChange={this.changeHandler}></input>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                NIC :
                            </td>
                            <td>
                                <input type="text" placeholder="NIC" value={nic} onChange={this.changeHandler}></input>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Type :
                            </td>
                            <td>
                                <input type="text" placeholder="User Type" value={type} onChange={this.changeHandler}></input>
                            </td>
                        </tr>
                        <tr>
                            <td>
                            </td>
                            <td>
                                <button type="submit">Sign Up</button>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Already have an account?
                            </td>
                            <td>
                                <button type="submit" onClick={this.login}>Log in</button>
                            </td>
                        </tr>
                    </table>
                </form>
                <br /><br />

            </div>
        );
    }
}

export default Signup;