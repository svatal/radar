export interface IPosition {
  x: number;
  y: number;
}

export function getVector(a: IPosition, b: IPosition): IPosition {
  return { x: b.x - a.x, y: b.y - a.y };
}

export function getDistance(a: IPosition, b: IPosition): number {
  const vector = getVector(a, b);
  return Math.sqrt(vector.x ** 2 + vector.y ** 2);
}

export function isDefined<T>(i: T | undefined): i is T {
  return i !== undefined;
}
