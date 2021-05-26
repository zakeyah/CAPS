'use strict';
const events = require('./events');

events.on('pickup',pickUp);
function pickUp(payload) {
  console.log(`DRIVER: picked up ${payload.orderID}`);
  setTimeout(() => {
    events.emit('inTransit', payload);
  }, 1000);
}

events.on('delivered',deliveredHandler);
function deliveredHandler(payload) {
  console.log(`DRIVER: delivered  up ${payload.orderID}`);
  events.emit('thanks', payload);
}


events.on('lastDelivered',lastDeliveredHandler);
function lastDeliveredHandler(payload) {
  const log = {
    event: 'delivered',
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

