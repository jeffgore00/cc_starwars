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
const execRollbackActionsMock = jest.fn();
const errorHandlers = {
  acknowledgeError,
  execRollbackActions: execRollbackActionsMock
};

const error = { source: 'local', statusCode: 404 };

describe('The ErrorMessage Component', () => {
  it('renders a modal by default', () => {
    const errorMessage = mount(<ErrorMessage store={store} error={error} execRollbackActions={execRollbackActionsMock}/>);
    expect(errorMessage.exists(Modal)).toBe(true);
  });

  it("sets the modal's modalOpen state to false on handleClose", () => {
    const errorMessage = mount(
      <ErrorMessage store={store} error={error} {...errorHandlers} />
    );
    errorMessage
      .childAt(0)
      .instance()
      .handleClose();
    expect(errorMessage.childAt(0).state('modalOpen')).toBe(false);
  });

  it('calls the acknowledgeError and execRollbackActions funcs on handleClose', () => {
    const errorMessage = shallow(
      <ErrorMessage store={store} error={error} {...errorHandlers} />
    );
    errorMessage
      .dive()
      .instance()
      .handleClose();
    expect(store.dispatch).toHaveBeenCalledWith({
      error: null,
      type: 'ERROR_ACKNOWLEDGED'
    });
    expect(execRollbackActionsMock).toHaveBeenCalled();
  });

  /* Note that this test suite does not even check if the modal is closed when
  the error is acknowledged! */
});
