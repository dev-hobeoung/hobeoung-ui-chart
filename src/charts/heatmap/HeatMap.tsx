/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import { ChartDataType } from '../DataType';
import { VariantProps } from 'class-variance-authority';
import { bgClassNameToColor, colorVariantDef, heatmapVariants } from '../../Types';

export interface HeatMapDataType extends ChartDataType {
  x: number;
  y: number;
}

export interface HeatMapProps extends VariantProps<typeof heatmapVariants> {
  numRows: number;
  numCols: number;
  data: HeatMapDataType[];
  width?: number;
  height?: number;
  xAxisLabel?: string;
  yAxisLabel?: string;
  xAxisLabelStyle?: {
    fontSize?: string;
    fontColor?: string;
  };
  yAxisLabelStyle?: {
    fontSize?: string;
    fontColor?: string;
  };
  margin?: { top: number, right: number, bottom: number, left: number };
  scaleRange?: number[];
  scaleColor?: string[];
}

export const Heatmap: React.FC<HeatMapProps> = ({
  numRows,
  numCols,
  data,
  width = 600,
  height = 600,
  xAxisLabel,
  yAxisLabel,
  xAxisLabelStyle,
  yAxisLabelStyle,
  margin = { top: 30, right: 30, bottom: 80, left: 80 },
  scaleRange,
  variant,
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  // Data의 x, y 값을 기반으로 Heatmap의 x, y축 범위를 산출
  const xValues = data.map(d => d.x);
  const xMaxValue = Math.max(...xValues);
  const xInterval = Math.pow(10, Math.floor(Math.log10(xMaxValue / numCols)) + 1);

  const yValues = data.map(d => d.y);
  const yMaxValue = Math.max(...yValues);
  const yInterval = Math.pow(10, Math.floor(Math.log10(yMaxValue / numRows)) + 1);

  // 주어진 데이터를 기반으로 Heatmap에 실제 그려지는 이중배열 데이터를 생성
  const gridData: number[][] = Array.from({ length: numRows }, () => Array(numCols).fill(0));
  data.forEach(d => {
    const xPosition = Math.floor(d.x / xInterval) - 1;
    const yPosition = Math.floor(d.y / yInterval) - 1;

    if (d.value) {
      gridData[yPosition][xPosition] = gridData[yPosition][xPosition] + d.value;
    }
  });

  // 데이터의 value를 기반으로 scaleRange 산정
  if (!scaleRange) {
    const maxDataValue = Math.max(...gridData.flat());
    // ScaleRange Auto는 자동으로 GridData의 최댓값을 감지함. 이게 싫으면 ScaleRange를 직접 설정하면됨.
    // 최대값이 0인 경우, 1로 설정하여 0인 값임을 정확히 명시함. 그렇지 않으면 Max로 인지되 모두 0인데 색이 깔림.
    scaleRange = [0, maxDataValue === 0 ? 1 : maxDataValue];
  }

  useEffect(() => {
    if (!svgRef.current) return;

    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    // Create scales for X and Y axes
    const xScaleBand = d3.scaleBand()
      .range([0, chartWidth])
      .domain(d3.range(numCols).map(String))
      .paddingInner(0.020)
      .paddingOuter(0);

    const yScaleBand = d3.scaleBand()
      .range([chartHeight, 0])
      .domain(d3.range(numRows).map(String))
      .paddingInner(0.020)
      .paddingOuter(0);

    const xScaleLinear = d3.scaleLinear()
      .domain([0, numCols])
      .range([0, chartWidth]);

    const yScaleLinear = d3.scaleLinear()
      .domain([0, numRows])
      .range([chartHeight, 0]);

    // Color scale
    const maxColor = bgClassNameToColor(colorVariantDef[variant ?? "instance1"]);
    const colorScale = d3.scaleLinear(scaleRange, ["#f1f3f4", maxColor]);

    // Create SVG
    const svg = d3.select(svgRef.current)
      .attr('width', chartWidth + margin.left + margin.right)
      .attr('height', chartHeight + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`)

    // Background
    svg.append('rect')
      .attr('width', chartWidth)
      .attr('height', chartHeight)
      .attr('fill', '#ffffff');

    // Create heatmap cells with text
    const flatData = gridData.flat();
    const heatmapData = flatData.map((value, index) => ({
      row: Math.floor(index / numCols),
      col: index % numCols,
      value,
    }));

    const tooltip = d3.select('body').append('div')
      .style('position', 'absolute')
      .style('visibility', 'hidden')
      .style('background-color', 'rgba(0, 0, 0, 0.75)')
      .style('color', 'white')
      .style('padding', '5px')
      .style('border-radius', '5px')
      .style('font-size', '12px');

    svg.selectAll()
      .data(heatmapData, d => `${d?.row}:${d?.col}`)
      .join('rect')
      .attr('x', d => xScaleBand(d.col.toString())!)
      .attr('y', d => yScaleBand(d.row.toString())!)
      .attr('width', xScaleBand.bandwidth())
      .attr('height', yScaleBand.bandwidth())
      .attr('fill', d => colorScale(d.value))
      .on('mouseover', function () {
        tooltip.style('visibility', 'visible');
      })
      .on('mousemove', function (event, d) {
        tooltip
          .html(`Row: ${d.row + 1}<br>Col: ${d.col + 1}<br>Value: ${Math.round(d.value)}`)
          .style('top', `${event.pageY - 30}px`)
          .style('left', `${event.pageX + 10}px`);
      })
      .on('mouseout', function () {
        tooltip.style('visibility', 'hidden');
      });

    // Add text inside each cell
    svg.selectAll()
      .data(heatmapData, d => `${d?.row}:${d?.col}`)
      .join('text')
      .attr('x', d => xScaleBand(d.col.toString())! + xScaleBand.bandwidth() / 2)
      .attr('y', d => yScaleBand(d.row.toString())! + yScaleBand.bandwidth() / 2)
      .attr('dy', '.35em') // Vertical alignment
      .attr('text-anchor', 'middle') // Horizontal alignment
      .attr('fill', '#000000') // Text color
      .attr('font-size', '10px') // Font size
      .text(d => Math.round(d.value)) // Display rounded value
      .on('mouseover', function () {
        tooltip.style('visibility', 'visible');
      })
      .on('mousemove', function (event, d) {
        tooltip
          .html(`Row: ${d.row + 1}<br>Col: ${d.col + 1}<br>Value: ${Math.round(d.value)}`)
          .style('top', `${event.pageY - 30}px`)
          .style('left', `${event.pageX + 10}px`);
      })
      .on('mouseout', function () {
        tooltip.style('visibility', 'hidden');
      });

    // X, Y축의 Tick을 그린다.
    svg.append('g')
      .attr('transform', `translate(0,${chartHeight})`)
      .call(d3.axisBottom(xScaleLinear).tickSize(10).tickPadding(10));
    svg.append('g').call(d3.axisLeft(yScaleLinear).tickSize(10).tickPadding(10));

    // Tick 스타일링
    svg.selectAll('.tick text').attr('fill', '#5f6368').style('font-size', '12px')
    svg.selectAll('.tick line').attr('stroke', '#dadce0');
    svg.selectAll('.domain').remove();

    // X axis label
    if (xAxisLabel) {
      svg.append('text')
        .attr('x', chartWidth / 2)
        .attr('y', chartHeight + margin.bottom - 10)
        .attr('text-anchor', 'middle')
        .attr('font-size', xAxisLabelStyle?.fontSize ?? '14px')
        .attr('fill', xAxisLabelStyle?.fontColor ?? '#ffffff')
        .text(xAxisLabel);
    }

    // Y axis label
    if (yAxisLabel) {
      svg.append('text')
        .attr('x', -(chartHeight / 2))
        .attr('y', -margin.left + 20)
        .attr('text-anchor', 'middle')
        .attr('font-size', yAxisLabelStyle?.fontSize ?? '14px')
        .attr('fill', yAxisLabelStyle?.fontColor ?? '#ffffff')
        .attr('transform', 'rotate(-90)')
        .text(yAxisLabel);
    }

    // Cleanup on component unmount
    return () => {
      d3.select(svgRef.current).selectAll('*').remove();
    };
  }, [numRows, numCols, data]);

  return <svg ref={svgRef} />;
};
