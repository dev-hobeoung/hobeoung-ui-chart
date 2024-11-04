/*
  2024.11.1.
  현재 시안 기준으로는 grid 차트는 over만 대응하도록 되어있다.
  그런데, 나는 grid 차트가 끝까지 over만 대응할 것 같지도 않다. 또한, 만약 이미 해당 목적으로 쓰고있는데,
  추가 요구 사항이 들어오면 교통사고이기 때문에 일반적인 케이스의 Grid를 만들고 GridOver를 이를 활용하여 추가 구현하였다.
  추가로, GridOver는 특성상 Legend를 사용할 케이스가 없는 것으로 판단함.
*/

import { Grid, GridDataType } from "./Grid";

export interface GridOverProps {
  data: number[];
  overRanges?: number[];
}

export const GridOver: React.FC<GridOverProps> = ({ data, overRanges }) => {
  const labels: string[] = [];
  const gridData: GridDataType[] = [];

  // overRanges가 정의되지 않은 경우, 5개 Scale을 기준으로 default OverRanges를 설정한다.
  if (!overRanges || overRanges.length === 0) {
    const maxDataValue = Math.max(...data);
    const minDataValue = Math.min(...data);

    overRanges = Array.from({ length: 5 }, (_, i) => {
      return Math.floor(maxDataValue - minDataValue) / 5 * (i + 1);
    });
  }

  overRanges.forEach(range => {
    const overData = data.filter(d => d > range);
    const label = `>${range}`;
    labels.push(label);
    gridData.push({
      label,
      value: overData.length,
    });
  });

  return (
    <Grid
      labels={labels}
      data={gridData}
      labelHeader="Over"
      valueHeader="Value"
    />
  );
}
