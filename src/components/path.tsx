import * as b from "bobril";
import { getCubicStart, ICubicPath } from "../cubicPath";
import { IPosition } from "../utils";

export function Path(p: { path: ICubicPath[] }) {
  const path = `M ${display(getCubicStart(p.path, 0))} ${p.path
    .map((c) => `C ${display(c.c1)} ${display(c.c2)} ${display(c.end)}`)
    .join(" ")}`;
  return <path fill="transparent" stroke="black" d={path} />;
}

function display(p: IPosition) {
  return `${p.x},${p.y}`;
}
