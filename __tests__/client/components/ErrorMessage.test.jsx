import React from 'react';
import { mount, shallow } from 'enzyme';
import { Modal } from 'semantic-ui-react';
import ErrorMessage from '../../../src/client/components/ErrorMessage';

const store = {
  getState: jest.fn(),
  dispatch: jest.fn(),
  subscribe: jest.fn()
};

const acknowledgeError = jest.fn(() => store.dispatch('errorAcknowledged'));
const execRollbackActions = jest.fn();
const errorHandlers = {
  acknowledgeError,
  execRollbackActions
};

const error = { source: 'local', statusCode: 404 };

describe('The ErrorMessage Component', () => {
  it('renders a modal by default', () => {
    const errorMessage = mount(<ErrorMessage store={store} error={error} />);
    expect(errorMessage.exists(Modal)).toBe(true);
  });

  it("sets the modal's modalOpen state to true on handleOpen", () => {
    const errorMessage = shallow(<ErrorMessage store={store} error={error} />);
    errorMessage
      .dive()
      .instance()
      .handleOpen();
    expect(errorMessage.dive().state('modalOpen')).toBe(true);
  });

  it('calls the acknowledgeError and execRollbackActions funcs on handleClose', () => {
    const errorMessage = shallow(
      <ErrorMessage store={store} error={error} {...errorHandlers} />
    );
    errorMessage
      .dive()
      .instance()
      .handleClose();
    expect(store.dispatch).toHaveBeenCalledWith({"error": null, "type": "ERROR_ACKNOWLEDGED"});
    expect(execRollbackActions).toHaveBeenCalled();
  });

  /* Note that this test suite does not even check if the modal is closed when
  the error is acknowledged! */
});