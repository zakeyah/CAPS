'use strict';

const events = require('./Events/events');
const vendor = require('./Events/vendor');
const driver = require('./Events/driver');


const faker = require('faker');
const STORE = process.env.STORE;

let x;
function make(){

  x= {
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
 make()
 events.on('pickup', (payload) => {
   console.log('EVENT ', payload);
 });


setInterval(() => {
  make();
  events.emit('pickup',x)

}, 5000);

events.on('pickup', driver.pickUp);
events.on('delivered', driver.delivered);
