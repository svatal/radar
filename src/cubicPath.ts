import { IPosition, getDistance, getVector } from "./utils";

export interface ICubicPath {
  c1: IPosition;
  c2: IPosition;
  end: IPosition;
}

export function getCircularPath(
  positions: IPosition[],
  t: number
): ICubicPath[] {
  if (positions.length < 2) {
    throw "Not enough points.";
  }
  const [, after] = getControlPointsIdx(positions, positions.length - 1, t);
  let prevAfter = after;

  return positions.map((p, i) => {
    const [before, after] = getControlPointsIdx(positions, i, t);
    const r: ICubicPath = { c1: prevAfter, c2: before, end: p };
    prevAfter = after;
    return r;
  });
}

function getControlPointsIdx(
  positions: IPosition[],
  centerIdx: number,
  t: number
) {
  return getControlPoints(
    positions[(positions.length + centerIdx - 1) % positions.length],
    positions[centerIdx % positions.length],
    positions[(centerIdx + 1) % positions.length],
    t
  );
}

function getControlPoints(
  before: IPosition,
  point: IPosition,
  after: IPosition,
  t: number
): [IPosition, IPosition] {
  const distToBefore = getDistance(before, point);
  const distToAfter = getDistance(point, after);
  const scaleBefore = (t * distToBefore) / (distToBefore + distToAfter); // scaling factor for before control point
  const scaleAfter = (t * distToAfter) / (distToBefore + distToAfter); // scaling factor for after control point
  const beforeAfterVector = getVector(before, after);
  return [
    {
      x: point.x - scaleBefore * beforeAfterVector.x,
      y: point.y - scaleBefore * beforeAfterVector.y,
    },
    {
      x: point.x + scaleAfter * beforeAfterVector.x,
      y: point.y + scaleAfter * beforeAfterVector.y,
    },
  ];
}

export function getCubicStart(path: ICubicPath[], index: number): IPosition {
  return path[(index - 1 + path.length) % path.length].end;
}

export interface IFullCubicPath extends ICubicPath {
  start: IPosition;
}

export function getFullCubicPath(
  path: ICubicPath[],
  index: number
): IFullCubicPath {
  return { ...path[index], start: getCubicStart(path, index) };
}
