/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/no-empty-object-type */

import IconThresholdSolid from '../../assets/ICON_THRESHOLD_SOLID.svg';

export interface ThresholdIconLegendElementProps {}

export const ThresholdIconLegendElement: React.FC<ThresholdIconLegendElementProps> = ({}: ThresholdIconLegendElementProps) => {
  return (
    <div>
      <span>
        <IconThresholdSolid />
      </span>
      <span>
        Threshold
      </span>
    </div>
  );
}
