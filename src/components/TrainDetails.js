import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import CardPayment from './CardPayment';
import MobilePayment from './MobilePayment';

class TrainDetails extends Component {
    constructor(props) {
        super(props);


        this.state = {
            trains: [
                {
                    trainNo: 1,
                    trainRoute: 'Route 1',
                    time: '12:00 pm'
                },
                {
                    trainNo: 2,
                    trainRoute: 'Route 2',
                    time: '09:00 am'
                },
                {
                    trainNo: 3,
                    trainRoute: 'Route 3',
                    time: '08:30 am'
                },
                {
                    trainNo: 4,
                    trainRoute: 'Route 4',
                    time: '03:30 pm'
                },
                {
                    trainNo: 5,
                    trainRoute: 'Route 5',
                    time: '05.30 pm'
                }
            ],
            loggedUser:{
                email: props.email,
                phone: props.phone,
                type: props.type
            },
            tickets: '',
            method: '',
            route: ''
        }
    }

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    bookTrain = e => {
        e.preventDefault();
        if (this.state.method === 'card') {
            ReactDOM.render(<CardPayment user={this.state.user} ntickets={this.state.tickets} route={this.state.route} />, document.getElementById('root'))
        } else if (this.state.method === 'mobile') {
            ReactDOM.render(<MobilePayment user={this.state.user} ntickets={this.state.tickets} route={this.state.route} />, document.getElementById('root'))
        }
    }

    render() {
        const { tickets, method, route } = this.state;
        return (
            <div>
                <h1 align="center">Train Booking System</h1>
                {this.state.trains.map(train => (
                    <div>
                        <form onSubmit={this.bookTrain}>
                            <table id="t01">
                                <tr>
                                    <th>Train No</th>
                                    <th>Train Route</th>
                                    <th>Tickets</th>
                                    <th>Pay Using..</th>
                                    <th>Enter Route</th>
                                </tr>
                                <tr key={train.trainNo}>
                                    <td>{train.trainNo} </td>
                                    <td>{train.trainRoute}</td>
                                    <td><input type="text" name="tickets" placeholder="number of tickets..." value={tickets} onChange={this.changeHandler} /></td>
                                    <td>
                                        <input type="text" name="method" placeholder="payment method..." value={method} onChange={this.changeHandler} />
                                    </td>
                                    <td><input type="text" name="route" placeholder="Enter route..." value={route} onChange={this.changeHandler} /></td>
                                    <td><button type="submit">Proceed</button></td>
                                </tr>
                            </table>
                        </form>
                    </div>
                ))
                }
            </div>
        );
    }
}

export default TrainDetails;