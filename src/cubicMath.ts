import { IFullCubicPath } from "./cubicPath";
import { IPosition } from "./utils";

export function getIntersections(
  curve: IFullCubicPath,
  origin: IPosition,
  alpha: number
) {
  // TODO
}

// https://mathworld.wolfram.com/BezierCurve.html
// https://mathworld.wolfram.com/BernsteinPolynomial.html
// B0,3 = (1-t)^3   = 1 - 3t + 3t^2 -  t^3
// B1,3 = 3t(1-t)^2 =     3t - 6t^2 + 3t^3
// B2,3 = 3t^2(1-t) =          3t^2 - 3t^3
// B3,3 = t^3       =                  t^3
export function getCoefficients(
  curve: IFullCubicPath,
  axis: keyof IPosition
): [number, number, number, number] {
  const points = [curve.start, curve.c1, curve.c2, curve.end].map(
    (p) => p[axis]
  );

  return [
    points[0],
    -3 * points[0] + 3 * points[1],
    3 * points[0] - 6 * points[1] + 3 * points[2],
    -points[0] + 3 * points[1] - 3 * points[2] + points[3],
  ];
}

export function getSinglePointOnCurve(
  curve: IFullCubicPath,
  t: number
): IPosition {
  const x = getCoefficients(curve, "x").reduceRight(
    (prev, current) => prev * t + current
  );
  const y = getCoefficients(curve, "y").reduceRight(
    (prev, current) => prev * t + current
  );
  return { x, y };
}
