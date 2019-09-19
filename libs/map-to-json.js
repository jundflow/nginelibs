module.exports = (map) => {
  return [...map].reduce((acc, val) => {
    acc[val[0]] = val[1];
    return acc;
  }, {});
}