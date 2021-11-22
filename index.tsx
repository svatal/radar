import * as b from "bobril";
import { Path } from "./src/components/path";
import { Segment } from "./src/components/segment";
import { getCircularPath, getFullCubicPath } from "./src/cubicPath";
import { IPosition } from "./src/utils";

b.init(() => <App />);

function App() {
  const points: IPosition[] = [
    { x: 100, y: 100 },
    { x: 200, y: 200 },
    { x: 250, y: 150 },
  ];
  const t = b.useState(0.8);
  const path = getCircularPath(points, t());
  return (
    <>
      <input type="text" value={t} />
      <svg style={{ width: "100%", height: "500" }}>
        <Path path={path} />
        {path.map((p, i) => (
          <Segment segment={getFullCubicPath(path, i)} />
        ))}
      </svg>
    </>
  );
}
