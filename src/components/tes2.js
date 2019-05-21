import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from "../App";
import LoginP from './Login';
import Signup from "./Signup";

import '../App.css';

class Login extends Component {

    /*      
    * after the user enters the email and the password and clicks login this toggle method is clled it checks whether the      
    * credentials are valid if valid directs the user to his/her account if not diplays an error message      
    */

    toggle = function (e) {
        const email = this.refs.email.value;
        const password = this.refs.password.value;

        if (email === '' || password === '') {
            alert('Email or Password Empty');
        } else {
            var credentials = {
                "email": email,
                "password": password
            };
            var count = false;
            /*              
            * calls the backend server which would route this resquest to the class which handels all request based on the              
            * users tabel              
            * */
            fetch('http://localhost:3001/user/' + credentials.email + '/' + credentials.password, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }).then(response => {
                return response.json();
            }).then(data => {
                var user = JSON.stringify(data);
                if (user !== '[]') {
                    console.log(user);
                    count = true;
                    console.log(data);
                    for (user of data) {
                        var name = user.name;
                        var points = user.loyaltypoints;
                    }

                    ReactDOM.render(<App name={name} points={points} email={email} />, document.getElementById('root'));
                } else {
                    alert("Invalid username or password");
                }
            }).catch(err => {
                alert(err);
            })
            if (count === true) {
                ReactDOM.render(<App />, document.getElementById('root'));
            } else {
                ReactDOM.render(<LoginP />, document.getElementById('root'));
            }
        }
    }


    /*      
    * when sign up button is clicked this method is called and it renders the Signup component      
    */
    signup() {
        ReactDOM.render(<Signup />, document.getElementById('root'));
    }

    render() {
        return (

            /*              
            * login form              
            */
            <div>
                <div>
                    <form>
                        <fieldset>
                            <legend>Online Food Shopping</legend>
                            <div>
                                <label>Email address</label>
                                <input placeholder="Enter email" type="email" ref="email" />
                        </div>
                            <div>
                                <label>Password</label>
                                <input placeholder="Password" type="password" ref="password" />
                            </div>
                            <button type="submit" onClick={() => this.toggle()}>Submit</button>
                        </fieldset>
                    </form>
                </div>
                <div>
                    <div>
                        <button type="submit" onClick={() => { this.signup() }}>Sign Up</button>
                    </div>

                </div>
            </div>
        )
    }
}

export default Login; 