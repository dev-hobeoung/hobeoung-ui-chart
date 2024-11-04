/* eslint-disable @typescript-eslint/no-empty-object-type */
import { Pie as RechartPie, PieChart, Cell } from "recharts";
import { ChartDataType } from "../DataType";
import { bgClassNameToColor, colorVariantDef } from "../../Types";
import { PieLabel } from "./PieLabel";
import { ReactElement, ReactNode } from "react";
import React from "react";

export interface PieDataType extends ChartDataType {}

export interface PieProps {
  labels?: string[];
  data: PieDataType[];
  isHalf?: boolean;
  children?: ReactNode;
}

const Pie = ({ labels = [], data, isHalf = false, children }: PieProps) => {
  let pieLabel: ReactElement | undefined = undefined;

  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child) && child.type === PieLabel) {
      pieLabel = child;
      // 직접 pieLabel에 appearance를 주입해버리는 경우에는 장사없지만, 일단 isHalf 속성에 따라 맞게 주입해준다.
      if (pieLabel.props.appearance === undefined) {
        pieLabel = React.cloneElement(pieLabel, { appearance: isHalf ? "half" : "full" });
      }
    }
  });

  return (
    <div className="relative w-[400px] h-[400px]">
      <PieChart width={400} height={400}>
        <RechartPie
          data={data.map((d) => ({ name: d.label, value: d.value }))}
          dataKey={"value"}
          innerRadius="60%"
          outerRadius="80%"
          startAngle={isHalf ? 180 : undefined}
          endAngle={isHalf ? 0 : undefined}
          stroke="none"
        >
          {data.map(d => {
            const labelIndex = labels.indexOf(d.label);
            return (
              <Cell
                key={`cell-${labels[labelIndex]}`}
                fill={bgClassNameToColor(Object.values(colorVariantDef)[labelIndex])}
              />
            );
          })}
        </RechartPie>
      </PieChart>
      {pieLabel}
    </div>
  );
}

Pie.Label = PieLabel;

export default Pie;
