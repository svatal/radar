import { IFullCubicPath } from "./cubicPath";
import { Polynomial } from "./polynomial";
import { IPosition } from "./utils";

export function tryToGetIntersection(
  curve: IFullCubicPath,
  origin: IPosition,
  alpha: number
): IPosition | undefined {
  const xCPoly = getBernsteinPolynomial(curve, "x");
  const yCPoly = getBernsteinPolynomial(curve, "y");
  // c0 + c1*t1 + c2*t1^2 + c3*t1^3 == c4 + c5*t2
  // t2 = ...
  const t2FromX = xCPoly
    .minus(new Polynomial(origin.x))
    .multiply(1 / Math.sin(alpha));
  const t2FromY = yCPoly
    .minus(new Polynomial(origin.y))
    .multiply(1 / Math.cos(alpha));
  // 0 = ...
  const poly = t2FromX.minus(t2FromY);
  const solution = tryToFindSolution(poly);
  if (solution === undefined) {
    return undefined;
  }
  const x = xCPoly.solveFor(solution);
  const y = yCPoly.solveFor(solution);
  return { x, y };
}

const epsilon = 0.01;
function tryToFindSolution(poly: Polynomial): number | undefined {
  // we assume that there is only one solution (intersection of curve and a line)
  // and we are interested in it only if it is between 0 and 1
  let min = 0;
  let max = 1;
  let rMin = poly.solveFor(min);
  let rMax = poly.solveFor(max);
  if (rMin * rMax > 0) {
    // no solution in range .. or exactly two :)
    return undefined;
  }
  while (Math.abs(rMin - rMax) > epsilon) {
    const middle = (min + max) / 2;
    const rMiddle = poly.solveFor(middle);
    if (rMin * rMiddle > 0) {
      min = middle;
      rMin = rMiddle;
    } else {
      max = middle;
      rMax = rMiddle;
    }
  }
  return (min + max) / 2;
}

// https://mathworld.wolfram.com/BezierCurve.html
// https://mathworld.wolfram.com/BernsteinPolynomial.html
// B0,3 = (1-t)^3   = 1 - 3t + 3t^2 -  t^3
// B1,3 = 3t(1-t)^2 =     3t - 6t^2 + 3t^3
// B2,3 = 3t^2(1-t) =          3t^2 - 3t^3
// B3,3 = t^3       =                  t^3
function getBernsteinPolynomial(
  curve: IFullCubicPath,
  axis: keyof IPosition
): Polynomial {
  const points = [curve.start, curve.c1, curve.c2, curve.end].map(
    (p) => p[axis]
  );

  return new Polynomial(
    points[0],
    -3 * points[0] + 3 * points[1],
    3 * points[0] - 6 * points[1] + 3 * points[2],
    -points[0] + 3 * points[1] - 3 * points[2] + points[3]
  );
}

export function getSinglePointOnCurve(
  curve: IFullCubicPath,
  t: number
): IPosition {
  const x = getBernsteinPolynomial(curve, "x").solveFor(t);
  const y = getBernsteinPolynomial(curve, "y").solveFor(t);
  return { x, y };
}
