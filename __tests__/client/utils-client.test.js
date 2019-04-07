import { buildErrorMessage, romanize } from '../../src/client/utils-client';

const LOCAL_404 = 'The requested content could not be found.';
const LOCAL_500 =
  'There was an internal server error. It was been logged and we will investigate. Our apologies!';
const SWAPI_404 =
  'The requested content could not be found on the SWAPI server.';
const SWAPI_500 =
  'There was a SWAPI internal server error. Please try your request again later.';
const GENERAL_ERROR = 'There was an error. Please try again later.';

describe('buildErrorMessage', () => {
  it('returns the appropriate message for a 404 from the Star Wars API', () => {
    const message = buildErrorMessage('SWAPI', 404);
    expect(message).toEqual(SWAPI_404);
  });

  it('returns the appropriate message for a 404 from the app server', () => {
    const message = buildErrorMessage('local', 404);
    expect(message).toEqual(LOCAL_404);
  });

  it('returns the appropriate message for a 500 from the Star Wars API', () => {
    const message = buildErrorMessage('SWAPI', 500);
    expect(message).toEqual(SWAPI_500);
  });

  it('returns the appropriate message for a 404 from the Star Wars API', () => {
    const message = buildErrorMessage('local', 500);
    expect(message).toEqual(LOCAL_500);
  });

  it('returns the appropriate message for errors which do not fall into the above categories', () => {
    const message = buildErrorMessage(null, 403);
    expect(message).toEqual(GENERAL_ERROR);
  });
});

describe('romanize', () => {
  it('returns NaN if the input is not a number', () => {
    const romanized = romanize('cheese');
    expect(romanized).toEqual(NaN);
  });

  it('returns the Roman numeral equivalent of the input number', () => {
    const romanized = romanize(9);
    expect(romanized).toEqual('IX');
  });
});
