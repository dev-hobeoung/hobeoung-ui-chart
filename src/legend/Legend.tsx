import { HTMLAttributes } from "react";
import { SquareLegendElement } from "./elements/SquareLegendElement";
import { TextLegendElement } from "./elements/TextLegendElement";
import { RoundLegendElement } from "./elements/RoundLegendElement";
import { LineLegendElement } from "./elements/LineLegendElement";
import { NumberLegendElement } from "./elements/NumberLegendElement";
import { ThresholdLineLegendElement } from "./elements/ThresholdLineLegendElement";
import { AverageLegendElement } from "./elements/AverageLegendElement";
import { ThresholdIconLegendElement } from "./elements/ThresholdIconLegendElement";
import { SquareCheckLegendElement } from "./elements/SquareCheckLegendElement";

export type LegendType =
  'average' |
  'filter' |
  'line' |
  'number' |
  'round' |
  'square' |
  'squareCheck' |
  'text' |
  'thresholdIcon' |
  'thresholdLine' |
  'average';

export type LegendPositionType =
  'top' |
  'bottom' |
  'left' |
  'right';

export interface LegendProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  labels: string[];
  type: LegendType;
  position: LegendPositionType;
  threshold?: 'line' | 'icon';
  average?: boolean;
}

export const Legend: React.FC<LegendProps> = ({
  title,
  labels,
  type,
  threshold,
  average,
  ...divProps
}) => {

  return (
    <div {...divProps}>
      <div>
        <span>{title}</span>
      </div>
      <div>
        {labels.map((label, index) => {
          switch (type) {
            case 'number':
              return <NumberLegendElement key={index} label={label} number={index+1} variant="instance1" />;
            case 'text':
              return <TextLegendElement key={index} label={label} />;
            case 'round':
              return <RoundLegendElement key={index} label={label} variant="instance1" />;
            case 'line':
              return <LineLegendElement key={index} label={label} variant="instance1" />;
            case 'square':
              return <SquareLegendElement key={index} label={label} variant="instance1" />;
            case 'squareCheck':
              return <SquareCheckLegendElement key={index} label={label} variant="instance1" checked={index % 2 === 0} />;
            default:
              return null;
          }
        })}
        {threshold && threshold === 'icon' && <ThresholdIconLegendElement />}
        {threshold && threshold === 'line' && <ThresholdLineLegendElement />}
        {average && <AverageLegendElement />}
      </div>
    </div>
  );
}
