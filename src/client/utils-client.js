export function convertToFilename(name) {
  return name
    .trim()
    .toLowerCase()
    .replace(' ', '-');
}

export function buildErrorMessage(source, statusCode) {
  if (statusCode === 404) {
    if (source === 'SWAPI') {
      return 'The requested content could not be found on the SWAPI server.';
    }
    return 'The requested content could not be found.';
  }
  if (statusCode === 500) {
    if (source === 'SWAPI') {
      return 'There was a SWAPI internal server error. Please try your request again later.';
    }
    return 'There was an internal server error. It was been logged and we will investigate. Our apologies!';
  }
  return 'There was an error. Please try again later.';
}

// Code source: https://stackoverflow.com/questions/9083037/
export function romanize(num) {
  if (isNaN(num)) return NaN;
  const digits = String(+num).split('');
    const key = [
      '',
      'C',
      'CC',
      'CCC',
      'CD',
      'D',
      'DC',
      'DCC',
      'DCCC',
      'CM',
      '',
      'X',
      'XX',
      'XXX',
      'XL',
      'L',
      'LX',
      'LXX',
      'LXXX',
      'XC',
      '',
      'I',
      'II',
      'III',
      'IV',
      'V',
      'VI',
      'VII',
      'VIII',
      'IX'
    ];
    let roman = '';
    let i = 3;
  while (i--) roman = (key[+digits.pop() + i * 10] || '') + roman;
  return new Array(+digits.join('') + 1).join('M') + roman;
}
