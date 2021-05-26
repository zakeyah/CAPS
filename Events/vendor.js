'use strict';

require('dotenv').config();
const events = require('./events');



events.on('pickup',pickupHandler);
function pickupHandler(payload) {
  const log = {
    event: 'pickup',
    time: new Date().toISOString(),
    payload: {
      store: payload.store,
      orderID: payload.orderID,
      customer: payload.customer,
      address: payload.address,
    },
  };
  console.log('EVENT', log);
}

events.on('inTransit',intransitHandler);
function intransitHandler(payload) {
  const log = {
    event: 'in-transit',
    time: new Date().toISOString(),
    payload: {
      store: payload.store,
      orderID: payload.orderID,
      customer: payload.customer,
      address: payload.address,
    },
  };
  console.log('EVENT', log);
  setTimeout(() => {
    events.emit('delivered', payload);
  }, 3000);
}

events.on('thanks',thanksdHandler);
function thanksdHandler(payload) {
  console.log(`VENDOR: Thank you for delivering ${payload.orderID}`);
  events.emit('lastDelivered', payload);
}



