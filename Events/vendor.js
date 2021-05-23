'use strict';

require('dotenv').config();
const events = require('./events');
const faker = require('faker');
const STORE = process.env.STORE;




function make(){

 return{
    event: 'pickup',
    time: new Date().toISOString(),
    payload:{
      store: STORE,
      orderID: faker.datatype.uuid(),
      customer: faker.name.findName(),
      address: `${faker.address.city()}, ${faker.address.stateAbbr()}`,
    },
  };
}
make();
console.log(make(),'jjjjjjjjj')

console.log(make(),'zzzzzzz')

events.on('pickup', (payload) => {
  console.log('EVENT ', payload);
});



module.exports={
  make
}
