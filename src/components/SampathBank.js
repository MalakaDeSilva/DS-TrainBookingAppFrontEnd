import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';
import TrainDetails from './TrainDetails';

class SampathBank extends Component {
    constructor(props) {
        super(props);

        this.state = {
            details: props.det,
            buttonClicked: "no"
        }
    }

    pay = e => {
        if (this.state.buttonClicked === 'yes') {
            e.preventDefault();
            Axios.post('localhost:3000/card-payment/', this.state.details)
                .then(response => {
                    console.log(response);
                    alert('Train booked. Check your email for the confirmation.');
                    ReactDOM.render(<TrainDetails />, document.getElementById('root'));
                })
                .catch(err => {
                    alert(err);
                });
        } else if (this.state.buttonClicked === 'no') {
            ReactDOM.render(<TrainDetails />, document.getElementById('root'));
        }
    }

    changeStatYes() {
        this.setState({
            buttonClicked: 'yes'
        })
    }

    changeStatNo() {
        this.setState({
            buttonClicked: 'no'
        })
    }

    render() {
        return (
            <div>
                Do you want to pay using your credit card?

                <button onClick={() => this.changeStatYes()}>Ok</button>
                <button onClick={() => this.changeStatNo()}>Cancel</button>
            </div>
        );
    }
}

export default SampathBank;