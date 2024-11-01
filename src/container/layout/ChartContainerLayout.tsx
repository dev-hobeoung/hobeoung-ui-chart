/*
  결국 레전드 위치 등에 따라 레이아웃이 달라지는데, 해당 코드는 해당 분기를 처리하는 일종의 짬통이다.
*/

export interface ChartContainerLayoutProps {
  title?: string;
  legend?: React.ReactElement | undefined;
  chart?: React.ReactElement | undefined;
}

export const ChartContainerLayout = ({ title, legend, chart }: ChartContainerLayoutProps) => {
  const legendPosition = legend?.props.position;

  return (
    <div>
      {/* Top Area */}
      <div>
        {/* Title Area */}
        {title && (
          <div>
            <span>{title}</span>
          </div>
        )}
        {legend && legendPosition === "top" && (
          <div>
            {legend}
          </div>
        )}
      </div>
      {/* Center Area */}
      <div className="flex">
        {/* Chart Area */}
        {chart && (
          <div>
            {chart}
          </div>
        )}
        {legend && legendPosition === "right" && (
          <div>
            {legend}
          </div>
        )}
      </div>
      {/* Bottom Area */}
      <div>
        {legend && legendPosition === "bottom" && (
          <div>
            {legend}
          </div>
        )}
      </div>
    </div>
  );
}
