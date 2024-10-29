/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/no-empty-object-type */

import IconAverageSolid from '../../assets/ICON_AVERAGE_SOLID.svg?react';

export interface AverageLegendElementProps {}

export const AverageLegendElement: React.FC<AverageLegendElementProps> = ({}: AverageLegendElementProps) => {
  return (
    <div className="flex items-center gap-[8px]">
      <span>
        <IconAverageSolid />
      </span>
      <span>
        Average
      </span>
    </div>
  );
}
