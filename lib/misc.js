function setUnion(setA, setB) {
  let _union = new Set(setA);
  for (let elem of setB) {
    _union.add(elem);
  }
  return _union;
}

function setInter(setA, setB) {
  let _intersection = new Set();
  for (let elem of setB) {
    if (setA.has(elem)) {
      _intersection.add(elem);
    }
  }
  return _intersection;
}

function setDiff(setA, setB) {
  let _difference = new Set(setA);
  for (let elem of setB) {
    _difference.delete(elem);
  }
  return _difference;
}

function isIterable(obj) {
  return obj && typeof obj[Symbol.iterator] === "function";
}

/**
 * A pure function to pick specific keys from object, similar to https://lodash.com/docs/4.17.4#pick
 * @param {Object}obj: The object to pick the specified keys from
 * @param {Array}keys: A list of all keys to pick from obj
 */
const pick = (obj, keys) =>
  Object.keys(obj)
    .filter((i) => keys.includes(i))
    .reduce((acc, key) => {
      acc[key] = obj[key];
      return acc;
    }, {});

function showFor(iter, limit = 10, keys = undefined) {
  isIterable(limit) && ([limit, keys] = [keys, limit]);
  limit = Number.isInteger(limit) ? limit : 10;
  for (let v of iter) {
    if (keys && keys.length > 0) {
      v = pick(v, keys);
    }
    typeof v !== "string" && isIterable(v) ? console.log(...v) : console.log(v);
    if (--limit === 0) {
      break;
    }
  }
}

function range(start, stop, step) {
  // python like range function
  if (!stop) {
    stop = start;
    start = 0;
  }
  step = step || 1;
  let a = [start],
    b = start;
  while (b < stop - step) {
    a.push((b += step));
  }
  return a;
}

module.exports = {
  setUnion,
  setInter,
  setDiff,
  isIterable,
  showFor,
  range,
  pick,
};
