
module.exports = class Calculadora {
  suma(a, b) { return parseFloat((a + b).toPrecision(15)); }
  resta(a, b) { return parseFloat((a - b).toPrecision(15)); }
  divide(a, b) {
    if (b === 0)
      throw new Error('Divide by 0');
    return a / b;
  }
};
