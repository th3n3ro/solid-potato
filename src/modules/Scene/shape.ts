import { Point, Size } from "./shared";

export abstract class Shape {}

export class Polygon extends Shape {
  constructor(public points: Point[]) {
    super();
  }
}

export class Circle extends Shape {
  constructor(public center: Point, public r: number) {
    super();
  }
}

export class Ellipse extends Shape {
  constructor(public center: Point, public size: Size) {
    super();
  }
}

export class Rectangle extends Shape {
  constructor(public position: Point, public size: Size) {
    super();
  }
}

export class RoundedRectangle extends Shape {
  constructor(public position: Point, public size: Size, public r: number) {
    super();
  }
}
