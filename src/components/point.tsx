import * as b from "bobril";
import { IPosition } from "../utils";

export function Point(p: { point: IPosition }) {
  return <circle cx={p.point.x} cy={p.point.y} r={2} stroke="red" />;
}
