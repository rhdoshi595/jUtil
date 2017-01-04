class Coordinate{
  constructor(x, y){
    this.x = x;
    this.y = y;
  }

  equals(coord){
    return ((this.x === coord.x) && (this.y === coord.y));
  }

  isOpposite(coord){
    return ((this.x === (-1 * coord.x)) && (this.y === (-1 * coord.y)));
  }

  plus(cardinal){
    return new Coordinate(this.x + cardinal.x, this.y + cardinal.y);
  }
}

module.exports = Coordinate;
