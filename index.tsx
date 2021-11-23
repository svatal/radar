import * as b from "bobril";
import { Line } from "./src/components/line";
import { Path } from "./src/components/path";
import { Point } from "./src/components/point";
import { Segment } from "./src/components/segment";
import { tryToGetIntersection } from "./src/cubicMath";
import { getCircularPath, getFullCubicPath } from "./src/cubicPath";
import { IPosition, isDefined } from "./src/utils";

b.init(() => <App />);

function App() {
  const points: IPosition[] = [
    { x: 100, y: 100 },
    { x: 200, y: 200 },
    { x: 250, y: 150 },
  ];
  const t = b.useState(0.8);
  const path = getCircularPath(points, t());
  const pos = { x: 200, y: 150 };
  const intersections = path
    .map((p, i) => tryToGetIntersection(getFullCubicPath(path, i), pos, 0.1))
    .filter(isDefined);
  return (
    <>
      <input type="text" value={t} />
      <svg style={{ width: "100%", height: "500" }}>
        <Path path={path} />
        {/* {path.map((p, i) => (
          <Segment segment={getFullCubicPath(path, i)} />
        ))} */}
        <Point point={pos} />
        <Line point={pos} alpha={0.1} distance={100} />
        {intersections.map((p) => (
          <Point point={p} />
        ))}
      </svg>
    </>
  );
}
