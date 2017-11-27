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
 label: 'R$ 2.50',
 price: 2.50,
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

     console.log(r)
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

   return (
     <div className="App">
       <header className="App-header">
         <Button label='Cancel' onClick={() => reset()}/>
       </header>
       <div className="App-body">
         <div className="App-products">
           {
             data.map((v, c) => {
               return <Button key={c} label={v.label} onClick={() => add(v)}/>
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

document.onkeydown = (e) => {
 console.log(e);
}

export default App;