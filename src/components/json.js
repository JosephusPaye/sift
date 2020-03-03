export function type(value) {
  if (['string', 'number', 'boolean'].includes(typeof value)) {
    return typeof value;
  } else if (value === null) {
    return 'null';
  } else if (Array.isArray(value)) {
    return 'array';
  } else if (typeof value === 'object') {
    return 'object';
  }

  return 'object';
}
