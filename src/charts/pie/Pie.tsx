/* eslint-disable @typescript-eslint/no-empty-object-type */
import { Pie as RechartPie, PieChart, Cell } from "recharts";
import { ChartDataType } from "../DataType";
import { bgClassNameToColor, legendElementVariantsVariantDef } from "../../Types";

export interface PieDataType extends ChartDataType {}

export interface PieProps {
  labels?: string[];
  data: PieDataType[];
  isHalf?: boolean;
}

export const Pie: React.FC<PieProps> = ({ labels = [], data, isHalf }) => {
  return (
    <PieChart width={400} height={400}>
      <RechartPie
        data={data.map((d) => ({ name: d.label, value: d.value }))}
        dataKey={"value"}
        innerRadius={60}
        outerRadius={80}
        startAngle={isHalf ? 180 : undefined}
        endAngle={isHalf ? 0 : undefined}
      >
        {data.map(d => {
          const labelIndex = labels.indexOf(d.label);
          return (
            <Cell
              key={`cell-${labels[labelIndex]}`}
              fill={bgClassNameToColor(Object.values(legendElementVariantsVariantDef)[labelIndex])}
            />
          );
        })}
      </RechartPie>
    </PieChart>
  );
}
