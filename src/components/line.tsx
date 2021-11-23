import * as b from "bobril";
import { IPosition } from "../utils";

export function Line(p: { point: IPosition; alpha: number; distance: number }) {
  const { point, alpha, distance } = p;
  return (
    <line
      x1={point.x}
      y1={point.y}
      x2={point.x + Math.sin(alpha) * distance}
      y2={point.y + Math.cos(alpha) * distance}
      stroke="black"
    />
  );
}
