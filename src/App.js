import React, { Component } from 'react';
import './App.css';
import Button from './Button'
import Ticket from './Ticket'
import _ from 'lodash'

const data = []

data.push({
 label: 'R$ 1.00',
 price: 1.00,
});
data.push({
  label: 'R$ 1.50',
  price: 1.50,
}); 
data.push({
 label: 'R$ 2.50',
 price: 2.50,
});
data.push({
  label: 'R$ 3.00',
  price: 3.00,
});
data.push({
  label: 'R$ 4.00',
  price: 4.00,
});
data.push({
  label: 'R$ 4.50',
  price: 4.50,
}); 
data.push({
  label: 'R$ 5.00',
  price: 5.00,
});
data.push({
  label: 'R$ 9.00',
  price: 9.00,
});
data.push({
  label: 'R$ 13.00',
  price: 13.00,
});
  
const receipt = {
 total: 0.00,
 quantity: 0,
 items: []
};

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

  componentWillMount() {

  }

  componentWillUnmount() {

  }

  render() {
    let {
     receipt = {},
    } = this.state;

    const reset = () => {
      this.setState({
        receipt: {
          total: 0.00,
          quantity: 0,
          items: [],
        }        
      });
    };

    const add = (i) => {
      const r = _.cloneDeep(this.state.receipt);
      r.total += i.price;
      r.quantity += 1;
      r.total.toFixed(2);

      const index = _.findIndex(r.items, (v) => v.price === i.price);

      if(index === -1) {
        r.items = [
          ...r.items,
          {
            quantity: 1,
            price: i.price,
            subtotal: i.price,
          }];
      } else {
        r.items = r.items.map((v, i) => {
          if(i !== index) return v;
          return {
            ...v,
            quantity: v.quantity + 1,
            subtotal: (v.price * (v.quantity + 1)).toFixed(2),
          }
        });
      }
      this.setState({ receipt: r })
    };

    const remove = (i) => {    
      const r = _.cloneDeep(this.state.receipt);
      console.log(JSON.stringify(r));
      r.total -= r.items[i].subtotal;
      r.quantity -= r.items[i].quantity;
      r.total.toFixed(2);
      r.items.splice(i, 1);
      this.setState({ receipt: r })
    };

    return (
      <div className="App">
        <header className="App-header">
          <Button label='Cancel' onClick={() => reset()} backgroundColor='#f44336' width='4.5rem' height='1.5rem'/>
          <Button label='Cartao' onClick={() => reset()} width='4.5rem' height='1.5rem'/>
          <Button label='Dinheiro' onClick={() => reset()} width='4.5rem' height='1.5rem'/>
        </header>
        <div className="App-body">
          <div className="App-products">
            {
              data.map((v, c) => {
                return <Button key={c} label={v.label} onClick={() => add(v)} width='4.5rem' height='4.5rem' />
              })
            }
          </div>
          <div className="App-ticket">
            <Ticket ticket={receipt} cancel={remove.bind(this)}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;