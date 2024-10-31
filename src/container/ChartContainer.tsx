import { createContext, HTMLAttributes, ReactElement, useState } from "react";
import React from "react";
import { Legend } from "../legend/Legend";
import { Heatmap } from "../charts/heatmap/HeatMap";
import { ChartContainerLayout } from "./layout/ChartContainerLayout";
import { ChartDataType } from "../charts/DataType";

export interface ChartContainerProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
}

export const ChartContext = createContext({});

{/* ChartContainer */}

const ChartContainer = ({ title, children, ...divProps }: ChartContainerProps) => {
  let chart: ReactElement | undefined = undefined;

  // 주어진 자식 컴포넌트 중, Chart 컴포넌트 1개를 찾는다.
  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child) && child.type === Heatmap) {
      chart = child;
    }
  });

  let legend: ReactElement | undefined = undefined;
  let labels: string[] | undefined = undefined;;

  // 주어진 자식 컴포넌트 중, Legend 컴포넌트 1개를 찾는다.
  React.Children.forEach(children, (child) => {
    // Legend 컴포넌트가 여러개 있을 경우, 첫번째 컴포넌트만 사용하도록 처리
    if (legend) return;

    if (React.isValidElement(child) && child.type === Legend) {
      legend = child;
    }

    // Legend 컴포넌트를 찾은 경우 라벨을 추출한다.
    if (legend && chart) {
      // Legend 컴포넌트에 별도의 라벨을 설정하지 않은 경우, 차트의 데이터에서 추출
      if (!legend.props.labels) {
        const data = chart.props.data as ChartDataType[];
        labels = Array.from(new Set(data.map((d) => d.label))).filter((label) => label !== undefined);
        legend = React.cloneElement(legend, { labels });
      }
      // Legend 컴포넌트에 라벨을 설정한 경우, 해당 라벨을 사용
      else {
        labels = legend.props.labels;
      }
    }
  });

  const [labelFilter, setLabelFilter] = useState<string[] | undefined>(labels);

  if (legend) {
    legend = React.cloneElement(legend, { labelFilter, setLabelFilter });
  }

  return (
    <div {...divProps}>
      <ChartContainerLayout title={title} legend={legend} chart={chart} />
    </div>
  );
};

ChartContainer.Legend = Legend;
ChartContainer.Heatmap = Heatmap;

export default ChartContainer;
