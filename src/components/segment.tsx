import * as b from "bobril";
import { IFullCubicPath } from "../cubicPath";
import { getSinglePointOnCurve } from "../cubicMath";
import { Point } from "./point";

export function Segment(p: { segment: IFullCubicPath }) {
  const segmentPoints = [...Array(10).keys()].map((i) =>
    getSinglePointOnCurve(p.segment, i / 10)
  );
  return (
    <>
      {segmentPoints.map((p) => (
        <Point point={p} />
      ))}
    </>
  );
}
