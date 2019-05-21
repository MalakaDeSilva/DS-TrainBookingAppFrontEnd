import React, { Component } from 'react';

import '../App';
import LoginP from './Login';
import ReactDOM from "react-dom";

class Signup extends Component {
    constructor(props) { super(props); }

    /*      
    *This method is called wwhen the submit button in the signup page is clicked, this method used to register a new user if the      
    * email addresse entered is not already in use      
    */

    signup() {
        const uname = this.refs.uname.value;
        const email = this.refs.email.value;
        const password = this.refs.password.value;
        const cpassword = this.refs.cpassword.value;
        const address = this.refs.address.value;

        /*          
        * If any of the fields are empty an alert is displayed          
        */
        if (uname == '' || email == '' || password == '' || cpassword == '' || address == '') {
            alert('One or more fields empty');
        } else {
            /*              
            * checks whether email is already in use              
            */
            var foundemail = false;
            fetch('http://localhost:3001/user/' + email,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    var user = JSON.stringify(data);
                    console.log(user);
                    if (user != '[]') {
                        alert('Email is already in use');
                    } else {

                        /*                      
                        *If the entered email is not already in use registers the user an directs the user to the login page                      
                        */
                        var data = {
                            "name": uname,
                            "email": email,
                            "password": password,
                            "address": address
                        };
                        console.log(data);
                        fetch('http://localhost:3001/user/', {
                            method: 'POST',
                            body: JSON.stringify(data),
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                            .then(response => {
                                return response.json();
                            })
                            .then(data => {
                                alert('Successful Sign Up');
                                ReactDOM.render(<LoginP />, document.getElementById('root'));
                            })
                            .catch(err => { alert("Second " + err); })
                    }

                }).catch(err => { alert("First Err: " + err); })
        }
    }

    login() {
        ReactDOM.render(<LoginP />, document.getElementById('root'));
    }


    render() {

        /*         
        * Signup form          
        */
        return (<div className="container">
            <div className="backimg">

                <div className="paddinglog">
                    <div class="progress">
                        <div class="progress-bar bar1" role="progressbar" aria-valuenow="15" aria-valuemin="0" aria-valuemax="100"></div>
                        <div class="progress-bar bg-success bar2" role="progressbar" aria-valuenow="30" aria-valuemin="0" ariavaluemax="100"></div>
                        <div class="progress-bar bg-info bar3" role="progressbar" aria-valuenow="20" aria-valuemin="0" ariavaluemax="100"></div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-7">
                        <form className="paddingsub">
                            <fieldset>
                                <legend>Online Food Shopping</legend>
                                <h3>Sign Up</h3>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Username</label>
                                    <input className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Username" type="text" ref="uname" />
                                </div>


                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Email address</label>
                                    <input className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" type="email" ref="email" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1">Password</label>
                                    <input className="form-control" id="exampleInputPassword1" placeholder="Password" type="password" ref="password" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1">Confirm Password</label>
                                    <input className="form-control" id="exampleInputPassword1" placeholder="Password" type="password" ref="cpassword" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Address</label>
                                    <input className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Address" type="text" ref="address" />
                                </div>
                                <button type="button" className="btn btnprimary" onClick={() => { this.signup() }}>Submit</button>
                            </fieldset>
                        </form>
                    </div>
                    <div className="col-md-5">
                        <div>
                            <button type="submit" className="btn btnprimary" onClick={() => { this.login() }}>Login</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>)
    }
}

export default Signup;