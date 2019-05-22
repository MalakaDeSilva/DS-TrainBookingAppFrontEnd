import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';

import App from '../App';
import Signup from './Signup';
import '../App.css';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }
    }

    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    submitHandler = e => {
        e.preventDefault()

        var loggedUser = {
            email: '',
            phone: '',
            type: ''
        }
        if (this.state.email !== '' && this.state.password !== '') {
            Axios.get('localhost:3000/' + this.state.email + '/' + this.state.password)
                .then((data) => {
                    var user = JSON.stringify(data);

                    if (user !== '[]') {
                        for (user of data) {
                            loggedUser.email = user.name;
                            loggedUser.phone = user.phone;
                            loggedUser.type = user.type;
                        }

                        ReactDOM.render(<App email={loggedUser.email} phone={loggedUser.phone} />, document.getElementById('root'));
                    } else {
                        alert("Invalid email or password.");
                    }
                })
                .catch(err => {
                    alert(err);
                })
        }
    }

    signup() {
        ReactDOM.render(<Signup />, document.getElementById('root'));
    }

    render() {
        const { email, password } = this.state;
        return (
            <div className='App'>
                <h1>Train Booking System</h1>
                <form onSubmit={this.submitHandler}>
                    <div>
                        <table>
                            <tr>
                                <td>
                                    Email :
                                </td>
                                <td>
                                    <input type="Email" placeholder="john.doe@email.com" name="email" value={email} onChange={this.changeHandler}></input>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Password :
                                </td>
                                <td> 
                                    <input type="Password" placeholder="*******" name="password" value={password} onChange={this.changeHandler}></input>
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>
                                    <button type="submit" onClick={this.submitHandler}>Log in</button>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    Don't have an account?
                                </td>
                                <td>
                                    <button type="submit" onClick={this.signup}>Sign Up!</button>
                                </td>
                            </tr>
                        </table>

                    </div>
                </form>
            </div>
        );
    }
}

export default Login