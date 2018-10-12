const ERROR_REPORTED = 'ERROR_REPORTED';
const ERROR_ACKNOWLEDGED = 'ERROR_ACKNOWLEDGED';

export const errorReported = error => ({
  type: ERROR_REPORTED,
  error
});

export const errorAcknowledged = () => ({
  type: ERROR_ACKNOWLEDGED,
  error: null
});

export default function(state = null, action) {
  switch (action.type) {
    case ERROR_REPORTED:
    case ERROR_ACKNOWLEDGED:
      return action.error;
    default:
      return state;
  }
}
