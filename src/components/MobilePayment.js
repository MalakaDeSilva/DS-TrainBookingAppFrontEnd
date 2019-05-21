import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Dialog from './Dialog';

class MobilePayment extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tickets: Number(props.ntickets),
            route: props.route,
            user: props.user,

            ticketDetails: [
                {
                    ticketCat: 'A',
                    price: 30,
                },
                {
                    ticketCat: 'B',
                    price: 20
                },
                {
                    ticketCat: 'C',
                    price: 10
                }
            ],
            ticketClass: '',
        }
    }

    changeHandler = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    submitHandler = e => {
        e.preventDefault();

        var amount = 0;

        if (this.state.ticketClass === 'A' || this.state.ticketClass === 'a') {
            amount = 30 * this.state.tickets;
        } else if (this.state.ticketClass === 'B' || this.state.ticketClass === 'b') {
            amount = 20 * this.state.tickets;
        } else if (this.state.ticketClass === 'C' || this.state.ticketClass === 'c') {
            amount = 10 * this.state.tickets;
        }

        if (this.state.user.type === 'govt') {
            amount = amount * 70 / 100;
        }

        const details = {
            totAm: amount,
            trainR: this.state.route,
            nticks: this.state.tickets,
            email: this.state.user.email,
            phone: this.state.user.phone
        }

        ReactDOM.render(<Dialog det={details} />, document.getElementById('root'));
    }

    render() {
        const ticketClass = this.state;
        return (
            <div>
                {
                    this.state.ticketDetails.map(ticketT => (
                        <div>
                            <form onSubmit={this.submitHandler}>
                                <table id="t01">
                                    <tr>
                                        <th>Ticket Class</th>
                                        <th>Ticket Price</th>
                                    </tr>
                                    <tr>
                                        <td>{ticketT.ticketCat}</td>
                                        <td>{ticketT.price}</td>
                                    </tr>
                                    <tr>
                                        <td>Enter the class : </td>
                                        <td><input type="text" value={ticketClass} name="ticketClass" placeholder="Enter the class..." onChange={this.changeHandler} /> </td>
                                    </tr>
                                    <tr>
                                        <td>Everything is filled?</td>
                                        <td><button type="submit"></button></td>
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

export default MobilePayment;