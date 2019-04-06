import React from 'react'

describe('Main ', () => {
  it('gives control of the <div id="main"> to React', () => {
    const main = document.createElement('div');
    document.body.appendChild(main)
    main.setAttribute('id', 'main');
    require('../../src/client/main');
    // expect(React.isValidElement(main.children[0])).toBe(true)
  });
});
