import { createContext, HTMLAttributes, ReactElement, useState } from "react";
import React from "react";
import { Legend } from "../legend/Legend";
import { Heatmap } from "../charts/heatmap/HeatMap";
import { ChartContainerLayout } from "./layout/ChartContainerLayout";
import { ChartDataType } from "../charts/DataType";
import { Grid } from "../charts/grid/Grid";
import { GridOver } from "../charts/grid/GridOver";
import Pie from "../charts/pie/Pie";
import PiePercent from "../charts/pie/PiePercent";

export interface ChartContainerProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
}

export const ChartContext = createContext({});

{/* ChartContainer */}

const ChartContainer = ({ title, children, ...divProps }: ChartContainerProps) => {
  let chart: ReactElement | undefined = undefined;

  let useLegend = true;
  let useFilter = true;

  // 주어진 자식 컴포넌트 중, Chart 컴포넌트 1개를 찾는다.
  React.Children.forEach(children, (child) => {
    // Chart 컴포넌트가 여러개 있을 경우, 첫번째 컴포넌트만 사용하도록 처리
    if (chart) return;

    if (React.isValidElement(child) && child.type === Heatmap) {
      chart = child;
    }
    else if (React.isValidElement(child) && child.type === Pie) {
      chart = child;
    }
    else if (React.isValidElement(child) && child.type === PiePercent) {
      chart = child;
      useLegend = false;
      useFilter = false;
    }
    else if (React.isValidElement(child) && child.type === Grid) {
      chart = child;
      useLegend = false;
      useFilter = false;
    }
    else if (React.isValidElement(child) && child.type === GridOver) {
      chart = child;
      useLegend = false;
      useFilter = false;
    }
  });

  let legend: ReactElement | undefined = undefined;
  let labels: string[] | undefined = undefined;;

  // Legend 및 필터 미사용 컴포넌트는 제외
  if (useLegend) {
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
  }

  const [labelFilter, setLabelFilter] = useState<string[] | undefined>(labels);

  if (useLegend && legend) {
    legend = React.cloneElement(legend, { labelFilter, setLabelFilter });
  }

  if (useFilter && chart) {
    /*
      chart as ReactElement를 넣어준 이유는 위에 undefined로 초기화해서 타입추론을 제대로 못하기 때문,
      그런데, 로직 상 undefined 상태를 특정 컴포넌트가 지정되지 않음으로 사용중이라 뺄수도 없음.
    */
    const filteredData = ((chart as ReactElement).props.data as ChartDataType[]).filter((d) => {
      // labelFilter가 undefined인 경우 모든 데이터를 표시. 즉, 필터를 적용하지 않음.
      if (labelFilter === undefined) return true;
      return labelFilter.includes(d.label);
    });
    chart = React.cloneElement(chart, { labels, data: filteredData });
  }

  return (
    <div {...divProps}>
      <ChartContainerLayout title={title} legend={legend} chart={chart} />
    </div>
  );
};

ChartContainer.Legend = Legend;

ChartContainer.Heatmap = Heatmap;
ChartContainer.Pie = Pie;
ChartContainer.PiePercent = PiePercent;
ChartContainer.Grid = Grid;
ChartContainer.GridOver = GridOver;

export default ChartContainer;
