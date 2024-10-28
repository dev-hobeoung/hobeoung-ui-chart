/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/no-empty-object-type */

export interface ThresholdLineLegendProps {}

export const ThresholdLineLegend: React.FC<ThresholdLineLegendProps> = ({}: ThresholdLineLegendProps) => {
  return (
    <div>
      <span className="flex gap-[2pxr]">
        <div className="w-[6px] h-[3px] flex-shrink-0 bg-[#EA3829] rounded-[1px]" />
        <div className="w-[6px] h-[3px] flex-shrink-0 bg-[#EA3829] rounded-[1px]" />
      </span>
      <span>
        Threshold
      </span>
    </div>
  );
}
