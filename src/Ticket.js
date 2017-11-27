import React, { Component } from 'react';
import './Ticket.css';

class Button extends Component {
  render() {
    const {
      ticket = {
        quantity: 0,
        subtotal: 0.0,
        items: [],
      },
    } = this.props;

    return (
      <div className="Ticket">
        <div className="Ticket-header">
        
        </div>
        <div className="Ticket-items">
          {
            ticket.items.map((v, i) => {
              return <div>{v.quantity} * {v.price} = {v.subtotal}</div>
            })
          }
        </div>
        <div className="Ticket-total">
        Items: {ticket.quantity} Total R$ {ticket.total || '0.00'}
        </div>      
      </div>
    );
  }
}

export default Button;
