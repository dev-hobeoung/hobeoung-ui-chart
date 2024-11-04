import React from "react";
import { ReactElement, ReactNode } from "react";
import { PolarAngleAxis, RadialBar, RadialBarChart } from "recharts";
import { PieLabel } from "./PieLabel";
import { VariantProps } from "class-variance-authority";
import { bgClassNameToColor, colorVariantDef, piePercentVariants } from "../../Types";

export interface PiePercentProps extends VariantProps<typeof piePercentVariants> {
  value: number;
  total: number;
  children?: ReactNode;
}

/*
  실제로는 PieChart가 아니라 RadialBarChart를 사용하여 구현하였다.
  실제로 PiePercent는 PieChart에 해당하지도 않고 구현이 가능하지도 않다.
*/
const PiePercent = ({ value, total, variant = "instance1", children }: PiePercentProps) => {
  let pieLabel: ReactElement | undefined = undefined;

  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child) && child.type === PieLabel) {
      pieLabel = child;
      if (pieLabel.props.appearance === undefined) {
        pieLabel = React.cloneElement(pieLabel, { appearance: "full" });
      }
    }
  });

  return (
    <div className="relative w-[400px] h-[400px]">
      <RadialBarChart
        width={400}
        height={400}
        cx="50%"
        cy="50%"
        innerRadius="80%"
        outerRadius="100%"
        barSize={50}
        data={[
          {
            name: "percent", value: value * 100 / total,
            fill: bgClassNameToColor(colorVariantDef[variant ?? "instance1"])
          },
        ]}
        startAngle={90}
        endAngle={-270}
      >
        <PolarAngleAxis
          type="number"
          domain={[0, 100]}
          angleAxisId={0}
          tick={false}
        />
        <RadialBar
          background
          cornerRadius={50}
          dataKey="value"
        />
      </RadialBarChart>
      {pieLabel}
    </div>
  )
}

PiePercent.Label = PieLabel;

export default PiePercent;
