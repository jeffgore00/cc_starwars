import React from 'react';
import { shallow } from 'enzyme';
import { Modal } from 'semantic-ui-react';
import Loading from '../../../src/client/components/Loading';

describe('Loading ', () => {
  it('should render a <Modal>', () => {
    const loading = shallow(
      <Loading  />
    );
    expect(loading.exists(Modal)).toBe(true);
  });
});
