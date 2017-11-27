import React, { Component } from 'react';
import './Ticket.css';

class Button extends Component {
  render() {
    const {
      ticket = {
        quantity: 0,
        total: 0.0,
        items: [],
      },
    } = this.props;

    return (
      <div className="Ticket">
        <div className="Ticket-header">
          <div className="Item-price">R$</div>
          <div className="Item-quantity">Qt</div>
          <div className="Item-subtotal">Subtotal</div>
        </div>
        <div className="Ticket-items">
          {
            ticket.items.map((v, i) => {
              return (
                <div key={i} className="Item">
                  <div className="Item-price">{v.price}</div>
                  <div className="Item-quantity">{v.quantity}</div>
                  <div className="Item-subtotal">{v.subtotal}</div>
                </div>)
            })
          }
        </div>
        <div className="Ticket-total">
          ({ticket.quantity}) Total R$ {ticket.total.toFixed(2) || '0.00'}
        </div>      
      </div>
    );
  }
}

export default Button;
