/* eslint-disable @typescript-eslint/no-empty-object-type */
import React, { useState } from "react";
import { ChartDataType } from "../DataType";
import { cn } from "../../utils/StyleUtils";
import { legendElementVariants, colorVariantDef } from "../../Types";
import IconUnfoldMore from '../../assets/ICON_UNFOLD_MORE.svg?react';

export interface GridDataType extends ChartDataType {}

export type GridDataSortKeyType = "label" | "value" | undefined;

export interface GridDataSortContext { 
  sortKey: GridDataSortKeyType; 
  desc: boolean | undefined;
}

export interface GridSortProps {
  useSort?: boolean;
  compare?: (
    sortKey: GridDataSortKeyType, 
    prev: GridDataType, 
    next: GridDataType,
    desc: boolean | undefined,
  ) => number; 
}

export interface GridProps extends GridSortProps {
  labels?: string[];
  data: GridDataType[];
  labelHeader?: string;
  valueHeader?: string;
}

export const Grid: React.FC<GridProps> = ({ 
  labels = [], 
  data, 
  labelHeader, 
  valueHeader, 
  useSort, 
  compare 
}) => {
  const [sortContext, setSortContext] = useState<GridDataSortContext>();

  if (!compare) {
    compare = (sortKey, prev, next, desc) => {
      if (sortKey === undefined || desc === undefined) return 0;

      let compare = 0;

      if (sortKey === "label") {
        compare = prev.label.localeCompare(next.label);
      }
      else if (sortKey === "value") {
        if (prev.value && !next.value) compare = -1;
        else if (!prev.value && next.value) compare = 1;
        else if (prev.value && next.value) compare = prev.value - next.value;
      }

      return desc ? compare * -1 : compare;
    }
  }

  const handleOnClickSort = (sortKey: GridDataSortKeyType) => {
    if (!sortContext || sortContext.sortKey !== sortKey) {
      setSortContext({ sortKey, desc: true });
      return;
    }
    if (sortContext.desc === false) setSortContext(undefined);
    else setSortContext({ ...sortContext, desc: false});
  }

  const sortedData = useSort ? 
    data.sort((prev, next) => {
      return compare(sortContext?.sortKey, prev, next, sortContext?.desc)
    }) : data;

  return (
    <table className="w-[400px] border border-1 border-[#dadce0] m-5">
      <thead className="border border-1 border-[#dadce0]">
        <tr>
          <th className="text-left border-[0.5px] border-[#dadce0] border-r-0 pr-2 pl-2">
            <div className="flex items-center">
              <span>{labelHeader ?? 'Label'}</span>
              {useSort && (
                <button type="button" onClick={() => handleOnClickSort("label")}>
                  <IconUnfoldMore />
                </button>
              )}
            </div>
          </th>
          <th className="text-left border-[0.5px] border-[#dadce0] border-l-0 pr-2 pl-2">
            <div className="flex items-center">
              <span>{valueHeader ?? 'Value'}</span>
              {useSort && (
                <button type="button" onClick={() => handleOnClickSort("value")}>
                  <IconUnfoldMore />
                </button>
              )}
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        {sortedData.map(d => {
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
