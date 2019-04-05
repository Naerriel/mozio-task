let timeout;

export const debounce = (callback, time) => {
  clearTimeout(timeout);
  timeout = setTimeout(callback, time);
}

export const randomNumber = (seed) => { // I want to write my own random number generator instead of using Math.random, as Math.random doesn't support seeds
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export const simpleHash = (s) => {
  let hash = 0;
  for(let i = 0; i < s.length; i++) {
    hash = Math.imul(31, hash) + s.charCodeAt(i) | 0;
  }
  return hash;
}
