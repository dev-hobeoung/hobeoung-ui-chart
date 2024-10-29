/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/no-empty-object-type */

import IconWarningSolid from '../../assets/ICON_WARNING_SOLID.svg?react';

export interface ThresholdIconLegendElementProps {}

export const ThresholdIconLegendElement: React.FC<ThresholdIconLegendElementProps> = ({}: ThresholdIconLegendElementProps) => {
  return (
    <div className="flex items-center gap-[8px]">
      <span>
        <IconWarningSolid />
      </span>
      <span>
        Threshold
      </span>
    </div>
  );
}
