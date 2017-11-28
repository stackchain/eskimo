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
  
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      receipt: {
        total: 0.00,
        quantity: 0,
        items: []               
      },
      isMoney: false,
      money: 0,
    }
  }

  changeMoney(s, v) {
    return ({...s, money: s.money + v});
  }

  componentWillMount() {

  }

  componentWillUnmount() {

  }
  
  add(s, i) {
    const r = _.cloneDeep(s.receipt);
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
    return ({...s, receipt: r });
  };

  reset (s) {
    return ({...s,
      receipt: {
        total: 0.00,
        quantity: 0,
        items: [],
      },
      isMoney: false,
      money: 0,        
    });
  };

  render() {
    let {
     receipt = {},
     isMoney = false,
     money = 0,
    } = this.state;

    const remove = (i) => {    
      const r = _.cloneDeep(this.state.receipt);
      r.total -= r.items[i].subtotal;
      r.quantity -= r.items[i].quantity;
      r.total.toFixed(2);
      r.items.splice(i, 1);
      this.setState({ receipt: r })
    };

    return (
      <div className="App">
        <header className="App-header">
          <div>
            <Button label='Cancel' onClick={() => this.setState({...this.reset(this.state)})} backgroundColor='#f44336' width='4.5rem' height='1.5rem'/>
          </div>
          <div className="right">
            <Button label='Cartao' onClick={() => this.setState({...this.reset(this.state)})} width='4.5rem' height='1.5rem'/>
            <Button label='Dinheiro' onClick={() => this.setState({...this.state, isMoney: !this.state.isMoney})} backgroundColor='#008CBA' width='4.5rem' height='1.5rem'/>
            <span>{Number(this.state.money).toFixed(2)}  - Troco R$ {Number(receipt.total - money).toFixed(2)}</span>
            <Button label='OK' onClick={() => this.setState({...this.reset(this.state)})} width='4.5rem' height='1.5rem'/>
          </div>
        </header>
        <div className="App-body">
          <div className="App-products">
            {
              !this.state.isMoney ?
              data.map((v, c) => {
                return <Button className="product" key={c} label={v.label} onClick={() => this.setState({...this.add(this.state, v)})} width='4.5rem' height='4.5rem' />
              })
              :
              [0.5, 1.0, 2.0, 5.0, 10.0, 20.0, 50.0, 0].map((v, c) => {
                return <Button className="money" key={c} label={v? `R$ ${v.toFixed(2)}` : 'Zerar'} onClick={() => v? this.setState({...this.changeMoney(this.state, v)}): this.setState({money: 0})} backgroundColor={v? '#008CBA' : '#f44336'} width='4.5rem' height='4.5rem' />
              })
            }
          </div>
          <div className="App-ticket">
            <Ticket ticket={this.state.receipt} cancel={remove.bind(this)}/>
          </div>
        </div>
      </div>
    );
  }
}

export default App;