import * as b from "bobril";

b.init(() => <App />);

function App() {
  const points: IPosition[] = [
    { x: 100, y: 100 },
    { x: 200, y: 200 },
    { x: 250, y: 150 },
  ];
  const t = b.useState(0.8);
  return (
    <>
      <input type="text" value={t} />
      <svg style={{ width: "100%", height: "500" }}>
        <Circle points={points} t={t()} />
      </svg>
    </>
  );
}

interface IPosition {
  x: number;
  y: number;
}

function Circle(p: { points: IPosition[]; t: number }) {
  return (
    <path fill="transparent" stroke="black" d={circularPath(p.points, p.t)} />
  );
}

function display(p: IPosition) {
  return `${p.x},${p.y}`;
}

function circularPath(positions: IPosition[], t: number): string {
  if (positions.length < 2) {
    throw "Not enough points.";
  }
  let result = `M ${display(positions[positions.length - 1])}`;
  const [, after] = getControlPointsIdx(positions, positions.length - 1, t);
  let prevAfter = after;

  for (let i = 0; i < positions.length; i += 1) {
    const [before, after] = getControlPointsIdx(positions, i, t);
    result += ` C ${display(prevAfter)} ${display(before)} ${display(
      positions[i]
    )}`;
    prevAfter = after;
  }
  return result;
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

function getVector(a: IPosition, b: IPosition): IPosition {
  return { x: b.x - a.x, y: b.y - a.y };
}

function getDistance(a: IPosition, b: IPosition): number {
  const vector = getVector(a, b);
  return Math.sqrt(vector.x ** 2 + vector.y ** 2);
}
