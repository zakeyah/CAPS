'use strict';

const faker = require('faker');
const vendor = require('../Events/vendor');
const driver = require('../Events/driver');
const events = require('../Events/events');

describe('Events test', () => {
  let consoleSpy;

  let payload = {
    store: '1-206-flowers',
    orderID: faker.datatype.uuid(),
    customer: faker.name.findName(),
    address: `${faker.address.city()}, ${faker.address.stateAbbr()}`,
  };
  
  jest.useFakeTimers();

  beforeAll(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  });
  afterAll(() => {
    consoleSpy.mockRestore();
  });

 
  it('test pickup event', () => {
    events.emit('pickup',payload);
  });
  setTimeout(() => {
    expect(consoleSpy).toHaveBeenCalled();
  }, 5000);

  it('test inTransit event', () => {
    events.emit('inTransit', payload);
    setTimeout(() => {
      expect(consoleSpy).toHaveBeenCalled();
    }, 1000);
  });
  it('test  delivered event ', () => {
    events.emit('delivered', payload);
    setTimeout(() => {
      expect(consoleSpy).toHaveBeenCalled();
    }, 3000);
  });
  it('test thanks event', () => {
    events.emit('thanks', payload);
    expect(consoleSpy).toHaveBeenCalled();
  });
 
  it('test lastDelivered event ', () => {
    events.emit('lastDelivered', payload);
    expect(consoleSpy).toHaveBeenCalled();
  });

});