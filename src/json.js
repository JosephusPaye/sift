export function getType(value) {
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
  const result = {
    valid: true,
    path: [],
  };

  if (!input.startsWith('.') && !input.startsWith('[')) {
    result.valid = false;
    return result;
  }

  const pathSegments = input
    .split('.')
    .filter(segment => segment.trim().length > 0);

  for (const segment of pathSegments) {
    if (identifierRegex.test(segment)) {
      result.path.push({
        accessType: 'object',
        key: segment,
      });
      continue;
    }

    const arrayMatch = arrayAccessRegex.exec(segment);

    if (arrayMatch) {
      result.path.push({
        accessType: 'array',
        key: arrayMatch[1],
        index: arrayMatch[2] === '*' ? '*' : parseInt(arrayMatch[2], 10),
      });
      continue;
    }

    result.valid = false;
    break;
  }

  return result;
}

export function getValue(json, targetPath, currentPath = '') {
  if (json === undefined) {
    return undefined;
  }

  if (targetPath.length == 0) {
    return {
      path: currentPath,
      value: json,
    };
  }

  const next = targetPath[0];

  if (next.accessType === 'object') {
    const value = json[next.key];
    return value === undefined
      ? undefined
      : getValue(value, targetPath.slice(1), currentPath + '.' + next.key);
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
          return getValue(
            item,
            targetPath.slice(1),
            currentPath + (next.key ? `.${next.key}[${index}]` : `[${index}]`)
          );
        })
        .filter(Boolean);
    } else {
      return getValue(
        value[next.index],
        targetPath.slice(1),
        currentPath +
          (next.key ? `.${next.key}[${next.index}]` : `[${next.index}]`)
      );
    }
  }

  return undefined;
}

export function filterByPath(json, filter) {
  const { valid, path } = parsePath(filter);
  let result = valid ? getValue(json, path) : undefined;

  if (result !== undefined) {
    result = normalizeFilterByPathResult(result);
  }

  return { valid, result };
}

function normalizeFilterByPathResult(result) {
  let normalized = undefined;

  if (Array.isArray(result)) {
    result.flat(99).forEach(({ path, value }) => {
      normalized = normalized ?? {};
      normalized[path] = value;
    });
  } else {
    normalized = {
      [result.path]: result.value,
    };
  }

  return normalized;
}

export function filterByQuery(json, query) {
  if (json === undefined) {
    return undefined;
  }

  const type = getType(json);

  if (type === 'array') {
    const filtered = json
      .map(value => {
        return filterByQuery(value, query);
      })
      .filter(value => value !== undefined);
    return filtered.length > 0 ? filtered : undefined;
  } else if (type === 'object') {
    let filtered;
    Object.keys(json).forEach(key => {
      const match = filterByQuery(json[key], query);
      if (match !== undefined) {
        filtered = filtered ?? {};
        filtered[key] = match;
      }
    });
    return filtered;
  } else {
    const hasMatch = String(json)
      .toLowerCase()
      .includes(query.toLowerCase());

    return hasMatch ? json : undefined;
  }
}

export function filterByPathAndQuery(json, filter) {
  const [path, query] = splitAtChar(filter, ' ');

  if (path && path.trim().length > 0) {
    const filtered = filterByPath(json, path.trim());

    if (filtered.valid && query && query.trim().length > 0) {
      return {
        valid: true,
        result: filterByQuery(filtered.result, query.trim()),
      };
    }

    return filtered;
  }

  if (query && query.trim().length > 0) {
    return {
      valid: true,
      result: filterByQuery(json, query.trim()),
    };
  }

  throw new Error('Invalid filter input: has no path and no query', filter);
}

function splitAtChar(string, char) {
  const index = string.indexOf(char);
  if (index === -1) {
    return [string, undefined];
  } else {
    return [string.slice(0, index), string.slice(index)];
  }
}
