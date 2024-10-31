import { createContext, HTMLAttributes } from "react";
import React from "react";
import { Legend } from "../legend/Legend";
import { Heatmap } from "../charts/heatmap/HeatMap";
import { ChartContainerLayout } from "./layout/ChartContainerLayout";

export interface ChartContainerProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
}

export const ChartContext = createContext({});

{/* ChartContainer */}

const ChartContainer = ({ title, children, ...divProps }: ChartContainerProps) => {
  // 주어진 자식 컴포넌트 중, Legend 컴포넌트 1개를 찾는다.
  let legend;
  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child) && child.type === Legend) {
      legend = child;
    }
  });

  // 주어진 자식 컴포넌트 중, Chart 컴포넌트 1개를 찾는다.
  let chart;
  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child) && child.type === Heatmap) {
      chart = child;
    }
  });

  return (
    <ChartContext.Provider value={{}}>
      <div {...divProps}>
        <ChartContainerLayout title={title} legend={legend} chart={chart} />
      </div>
    </ChartContext.Provider>
  );
};

ChartContainer.Legend = Legend;
ChartContainer.Heatmap = Heatmap;

export default ChartContainer;
