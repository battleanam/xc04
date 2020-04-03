/**
 * x 是否在 a,b 之间
 * @param x {number}
 * @param a {number}
 * @param b {number}
 * @returns {boolean}
 */
export function between(x, a, b) {
  if (a > b) {
    return b < x && x < a;
  } else {
    return a < x && x < b;
  }
}
