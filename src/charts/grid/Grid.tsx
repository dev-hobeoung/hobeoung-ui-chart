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
    <table className="w-[400px] border border-1 border-[#dadce0] m-5">
      <thead className="border border-1 border-[#dadce0]">
        <tr>
          <th className="text-left border-[0.5px] border-[#dadce0] border-r-0 pr-2 pl-2">
            {labelHeader ?? 'Label'}
          </th>
          <th className="text-left border-[0.5px] border-[#dadce0] border-l-0 pr-2 pl-2">
            {valueHeader ?? 'Value'}
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map(d => {
          const labelIndex = labels.indexOf(d.label);
          const variant = Object.keys(colorVariantDef)[labelIndex] as keyof typeof colorVariantDef;
          return (
            <tr key={d.label}>
              <td className="border-[0.5px] border-[#dadce0] border-r-0 pr-2 pl-2">
                <div className="flex items-center gap-[10px]">
                  {variant &&
                    <span>
                      <div className={cn(legendElementVariants({ variant, appearance: "square" }))} />
                    </span>
                  }
                  <span>{d.label}</span>
                </div>
              </td>
              <td className="border-[0.5px] border-[#dadce0] border-l-0 pr-2 pl-2">
                <span>{d.value}</span>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
