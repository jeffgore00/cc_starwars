import '../src/main';

describe('Main ', () => {
  afterEach(() => {
    console.log.mockRestore();
  });
  it('should start the server and log', done => {
    console.log = jest.fn(() => {
      expect(console.log).toHaveBeenCalledWith('Server is running on port 1337.');
      done();
    });
  });
});
