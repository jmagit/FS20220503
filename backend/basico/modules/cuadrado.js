
module.exports = class Square {
    constructor(width) { 
      this.width = width;  
    }
    area() { return this.width ** 2; }
    perimetro() { return this.width * 4; }
  };
  module.exports.circumference = function (r) {  return 2 * Math.PI * r; };
  