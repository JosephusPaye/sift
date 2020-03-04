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

const identifierRegex = /^[a-zA-Z_$][0-9a-zA-Z_$]*$/;
const arrayAccessRegex = /([a-zA-Z_$][0-9a-zA-Z_$]*)?\[(\d+|\*)\]/;

export function parsePath(input) {
  if (!input.startsWith('.') && !input.startsWith('[')) {
    return {
      valid: false,
      path: [],
    };
  }

  let valid = true;
  const path = [];

  const parts = input.split('.').filter(part => part.trim().length > 0);

  for (const part of parts) {
    if (identifierRegex.test(part)) {
      path.push({
        accessType: 'object',
        key: part,
      });
      continue;
    }

    const arrayMatch = arrayAccessRegex.exec(part);

    if (arrayMatch) {
      path.push({
        accessType: 'array',
        key: arrayMatch[1],
        index: arrayMatch[2] === '*' ? '*' : parseInt(arrayMatch[2], 10),
      });
      continue;
    }

    valid = false;
    break;
  }

  return {
    valid,
    path,
  };
}

export function navigate(json, target, currentPath = '') {
  if (!json) {
    return undefined;
  }

  if (target.length == 0) {
    return {
      path: currentPath,
      value: json,
    };
  }

  const next = target[0];

  if (next.accessType === 'object') {
    const value = json[next.key];
    return value === undefined
      ? undefined
      : navigate(value, target.slice(1), currentPath + '.' + next.key);
  } else if (next.accessType === 'array') {
    const value = next.key ? json[next.key] : json;

    if (value === undefined) {
      return undefined;
    }

    if (!Array.isArray(value)) {
      return undefined;
    }

    if (next.index === '*') {
      return value
        .map((item, index) => {
          return navigate(
            item,
            target.slice(1),
            currentPath + (next.key ? `.${next.key}[${index}]` : `[${index}]`)
          );
        })
        .filter(Boolean);
    } else {
      return navigate(
        value[next.index],
        target.slice(1),
        currentPath +
          (next.key ? `.${next.key}[${next.index}]` : `[${next.index}]`)
      );
    }
  }

  return undefined;
}

// console.log(parsePath('[*].x.typeComplexArray[20].typeString'));

// const { valid, path } = parsePath('.a[*].c[*].d');

// if (valid) {
//   console.log(
//     navigate({ a: [{ b: 'ok  boomer',  c:  ['ok',  'boomer'] }, { b: 'go  home  roger', c:  ['go',  'home'] }] }, path)
//   );
// }
