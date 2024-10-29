/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/no-empty-object-type */

export interface ThresholdLineLegendElementProps {}

export const ThresholdLineLegendElement: React.FC<ThresholdLineLegendElementProps> = ({}: ThresholdLineLegendElementProps) => {
  return (
    <div className="flex items-center gap-[10px]">
      <span className="flex gap-[2px]">
        <div className="w-[6px] h-[3px] flex-shrink-0 bg-[#EA3829] rounded-[1px]" />
        <div className="w-[6px] h-[3px] flex-shrink-0 bg-[#EA3829] rounded-[1px]" />
      </span>
      <span>
        Threshold
      </span>
    </div>
  );
}
