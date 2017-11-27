import React, { Component } from 'react';
import './App.css';
import Button from './Button'
import Ticket from './Ticket'

const data = []

data.push({
  label: 'R$ 1.00',
  price: 1.00,
});
data.push({
  label: 'R$ 2.50',
  price: 2.50,
});

const receipt = {};

function reset(r) {
  r = {
    total: 0.00,
    quantity: 0,
    items: []
  }
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      receipt,
    }
  }
  
  render() {
    let {
      receipt = {},
    } = this.state;  

    const reset = () => {
      receipt = {
        total: 0.00,
        quantity: 0,
        items: [],
      }
    };

    reset();

    const add = (i, r) => {
      r.total += i.price;
      r.quantity += 1;
      r.total.toFixed(2);

      const index = r.items.find((v) => {
        return v.price === i.price;
      });

      if(!index) {
        r.items.push({
          quantity: 1,
          price: i.price,
          subtotal: i.price,
        });
      } else {
        index.quantity += 1;
        index.subtotal = (index.price * index.quantity).toFixed(2);
      }
      console.log(JSON.stringify(receipt));
    };

    return (
      <div className="App">
        <header className="App-header">
          <span>header</span>
        </header>
        <div className="App-body">
          <div className="App-products">
            {
              data.map((v, c) => {
                return <Button key={c} label={v.label} onClick={() => add(v, receipt)}/>
              })
            }
          </div>
          <div className="App-ticket">
            <Ticket ticket={receipt}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
