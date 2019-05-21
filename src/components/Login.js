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
    
    changeHandler = e =>{
        this.setState({[e.target.name]: e.target.value})
    }

    submitHandler = e => {
        e.preventDefault()

        var loggedUser= {
            email:'',
            phone:'',
            type: ''
        }
        if(this.state.email !=='' && this.state.password !== ''){
            Axios.get('endpoint/'+this.state.email+'/'+this.state.password)
            .then((data) =>{
                var user = JSON.stringify(data);
                
                if(user !== '[]'){
                    for(user of data){
                        loggedUser.email = user.name;
                        loggedUser.phone = user.phone;
                        loggedUser.type = user.type;
                    }

                    ReactDOM.render(<App email={loggedUser.email} phone={loggedUser.phone}/>, document.getElementById('root'));
                } else{
                    alert("Invalid email or password.");
                }
            })
            .catch(err => {
                alert(err);
            })
        }
    }

    signup(){
        ReactDOM.render(<Signup />, document.getElementById('root'));
    }

    render() {
        const {email, password} = this.state;
        return (
            <div className='App'>
                <form onSubmit={this.submitHandler}>
                    <div>
                        Email :
            <input type="Email" placeholder="email" name="email" value={email} onChange={this.changeHandler}></input>
                        <br />
                        Password :
            <input type="Password" placeholder="password" name="password" value={password} onChange={this.changeHandler}></input>
                        <br />
                        <button type="submit" onClick={this.submitHandler}>Log in</button>
                    </div>
                </form>

                Don't have an account? 
                <button type="submit" onClick={this.signup}>Sign Up!</button>
            </div>
        );
    }
}

export default Login