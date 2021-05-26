'use strict';

const events = require('./Events/events');
const vendor = require('./Events/vendor');
const driver = require('./Events/driver');
const faker = require('faker');
const STORE = process.env.STORE;

setInterval(() => {
  events.emit('pickup', {
    store: STORE,
    orderID: faker.datatype.uuid(),
    customer: faker.name.findName(),
    address: `${faker.address.city()}, ${faker.address.stateAbbr()}`,
  });
}, 5000);

