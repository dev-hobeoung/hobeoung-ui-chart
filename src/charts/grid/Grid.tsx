/* eslint-disable @typescript-eslint/no-empty-object-type */
import React from "react";
import { ChartDataType } from "../DataType";
import { cn } from "../../utils/StyleUtils";
import { legendElementVariants, colorVariantDef } from "../../Types";

export interface GridDataType extends ChartDataType {}

export interface GridProps {
  labels?: string[];
  data: GridDataType[];
  labelHeader?: string;
  valueHeader?: string;
}

export const Grid: React.FC<GridProps> = ({ labels = [], data, labelHeader, valueHeader }) => {

  return (
    <table className="w-[400px]">
      <thead>
        <tr>
          <th>{labelHeader ?? 'Label'}</th>
          <th>{valueHeader ?? 'Value'}</th>
        </tr>
      </thead>
      <tbody>
        {data.map(d => {
          const labelIndex = labels.indexOf(d.label);
          const variant = Object.keys(colorVariantDef)[labelIndex] as keyof typeof colorVariantDef;
          return (
            <tr key={d.label}>
              <td className="flex items-center gap-[10px]">
                <span>
                  <div className={cn(legendElementVariants({ variant, appearance: "square" }))} />
                </span>
                <span>{d.label}</span>
              </td>
              <td>
                <span>{d.value}</span>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
