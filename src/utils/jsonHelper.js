export function type(obj) {
  const objType = typeof obj;
  if (typeof obj === 'object') {
    if (Array.isArray(obj)) {
      return 'array';
    } else if (objType === 'null') {
      return 'null';
    } else {
      return 'object';
    }
  } else {
    return typeof obj;
  }
}

export function deserialize(str) {
  const obj = JSON.parse(str);
  if (type(obj) === 'array') {
    return obj.map(item => deserialize(item));
  }
  if (type(obj) === 'object') {
    const temp = {};
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        temp[key] = deserialize(obj[key]);
      }
    }
    return temp;
  }

  return obj;
}
