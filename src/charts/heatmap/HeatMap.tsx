/* eslint-disable react-hooks/exhaustive-deps */
import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

export interface HeatMapProps {
  numRows: number;
  numCols: number;
  data: number[][];
  backgroundColor?: string;
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
}

export const HeatmapExample: React.FC = () => {
  return (
    <div>
      <div>
        <span>가나다</span>
      </div>
      <div>
        <Heatmap
          numRows={10}
          numCols={10}
          data={[[10, 10, 10, 10], [10, 10, 10, 10]]}
          backgroundColor='#ffffff'
          xAxisLabel='가나다'
          yAxisLabel='라마바'
        />
      </div>
    </div>
  );
}

export const Heatmap: React.FC<HeatMapProps> = ({
  numRows,
  numCols,
  data,
  backgroundColor,
  width = 600,
  height = 600,
  xAxisLabel,
  yAxisLabel,
  xAxisLabelStyle,
  yAxisLabelStyle,
  margin = { top: 30, right: 30, bottom: 80, left: 80 }
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    // Create scales for X and Y axes
    const xScaleBand = d3.scaleBand()
      .range([0, chartWidth])
      .domain(d3.range(numCols).map(String))
      .paddingInner(0.01)
      .paddingOuter(0);

    const yScaleBand = d3.scaleBand()
      .range([chartHeight, 0])
      .domain(d3.range(numRows).map(String))
      .paddingInner(0.01)
      .paddingOuter(0);

    const xScaleLinear = d3.scaleLinear()
      .domain([0, numCols])
      .range([0, chartWidth]);

    const yScaleLinear = d3.scaleLinear()
      .domain([0, numRows])
      .range([chartHeight, 0]);

    // Color scale
    const colorScale = d3.scaleSequential(d3.interpolateInferno)
      .domain([0, 100]);

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
      .attr('fill', backgroundColor ?? '#ffffff');

    // Create heatmap cells with text
    const flatData = data.flat();
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
      .attr('fill', 'white') // Text color
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

    // Draw X axis with ticks
    svg.append('g')
      .attr('transform', `translate(0,${chartHeight})`)
      .call(d3.axisBottom(xScaleLinear).tickSize(10).tickPadding(10))
      .select('.domain')  // 도메인 라인 선택
      .remove();  // 도메인 라인 제거

    svg.selectAll('g.axis-bottom g.tick line')  // 틱 라인 스타일 적용
      .attr('stroke', 'lightgray');

    // Draw Y axis with ticks
    svg.append('g')
      .call(d3.axisLeft(yScaleLinear).tickSize(10).tickPadding(10))
      .select('.domain')  // 도메인 라인 선택
      .remove();  // 도메인 라인 제거

    svg.selectAll('g.axis-left g.tick line')  // 틱 라인 스타일 적용
      .attr('stroke', 'lightgray');

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

  return <svg ref={svgRef}></svg>;
};
