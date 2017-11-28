import React, { Component } from 'react';
import './App.css';
import Button from './Button';
import Ticket from './Ticket';
import _ from 'lodash';
import * as firebase from 'firebase';
import moment from 'moment';


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
  label: 'R$ 6.90',
  price: 6.90,
});
data.push({
  label: 'R$ 9.00',
  price: 9.00,
});
data.push({
  label: 'R$ 10.00',
  price: 10.00,
});
data.push({
  label: 'R$ 12.50',
  price: 12.50,
});

data.push({
  label: 'R$ 13.00',
  price: 13.00,
});
  


// Initialize Firebase
const config = {
  apiKey: "AIzaSyDshRp-xmzOBuj-JyRvwmtHRsa_9tLz44k",
  authDomain: "eskimo-3bf82.firebaseapp.com",
  databaseURL: "https://eskimo-3bf82.firebaseio.com",
  projectId: "eskimo-3bf82",
  storageBucket: "",
  messagingSenderId: "659719251779"
};
firebase.initializeApp(config);

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

  handleSave(s) {
    firebase.database().ref('/receipts').push({...s, created: moment().format()}).then((r) => {
      console.log(r);
    }).catch((e) => {
      console.log(e);
    })
    this.setState(this.reset(this.state));
  }

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
            <Button label='Cancel' onClick={() => this.setState({...this.reset(this.state)})} backgroundColor='#f44336' width='5rem' height='5rem'/>
          </div>
          <div className="right">
            <Button label='Cartao' onClick={() => this.handleSave({...this.state.receipt, method: 'card'})} width='5rem' height='5rem'/>
            <Button label='Dinheiro' onClick={() => this.setState({...this.state, isMoney: !this.state.isMoney})} backgroundColor='#008CBA' width='5rem' height='5rem'/>
            <div style={{display: 'inherit', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'flex-end'}}> 
              <span>{Number(this.state.money).toFixed(2)}</span>
              <span>Troco R$ {Number(receipt.total - money).toFixed(2)}</span>
            </div>
            <Button label='OK' style={{opacity: isMoney? '1' : '0.5'}} onClick={() => this.handleSave({...this.state.receipt, method: 'money'})} width='5rem' height='5rem'/>
          </div>
        </header>
        <div className="App-body">
          <div className="App-products">
            {
              !this.state.isMoney ?
              data.map((v, c) => {
                return <Button className="product" key={c} label={v.label} onClick={() => this.setState({...this.add(this.state, v)})} width='5rem' height='5rem' />
              })
              :
              [0.1, 0.25, 0.5, 1.0, 2.0, 5.0, 10.0, 20.0, 50.0, 100.0, 0].map((v, c) => {
                return <Button className="money" key={c} label={v? `R$ ${v.toFixed(2)}` : 'Zerar'} onClick={() => v? this.setState({...this.changeMoney(this.state, v)}): this.setState({money: 0})} backgroundColor={v? '#008CBA' : '#f44336'} width='5rem' height='5rem' />
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