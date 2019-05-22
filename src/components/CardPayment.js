import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import SampathBank from './SampathBank';

class CardPayment extends Component {
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
            creditCard: '',
            cvc: ''
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

        if(this.state.user.type === 'govt'){
            amount = amount*70/100;
        } 

        const details = {
            cardN: this.state.creditCard,
            cvcN: this.state.cvc,
            totAm: amount,
            trainR: this.state.route,
            nticks: this.state.tickets,
            email: this.state.user.email,
            phone: this.state.user.phone
        }

        ReactDOM.render(<SampathBank det={details}/>, document.getElementById('root'));
    }

    render() {
        const { ticketClass, creditCard, cvc } = this.state;

        return (
            <div>
                <h1 align="center">Train Booking System</h1>
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
                                        <td>Credit Card :</td>
                                        <td><input type="text" value={creditCard} name="creditCard" onChange={this.changeHandler} placeholder="xxxx xxxx xxxx" /></td>
                                    </tr>
                                    <tr>
                                        <td>CVC : </td>
                                        <td><input type="text" value={cvc} name="cvc" onChange={this.changeHandler} placeholder="xxx" /></td>
                                    </tr>
                                    <tr>
                                        <td>Everything is filled?</td>
                                        <td><button type="submit">Done</button></td>
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

export default CardPayment;