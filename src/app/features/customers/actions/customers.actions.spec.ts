import * as fromCustomers from './customers.actions';

describe('loadCustomerss', () => {
  it('should return an action', () => {
    expect(fromCustomers.loadCustomerss().type).toBe('[Customers] Load Customerss');
  });
});
