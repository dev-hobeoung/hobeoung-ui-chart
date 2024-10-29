import { HTMLAttributes } from "react";
import { LegendElement } from "./elements/LegendElement";
import { legendPositionVariants } from "../Types";

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
  position,
  threshold,
  average,
}) => {

  return (
    <div className={legendPositionVariants({ position })}>
      <span>{title}</span>
      {labels.map((label, index) => (
        <LegendElement
          key={index}
          type={type}
          label={label}
          index={index}
          variant={`instance${index + 1}`}
          selected={false}
          setSelected={() => {}}
        />
      ))}
      {threshold && threshold === 'icon' && <LegendElement type="thresholdIcon" selected={false} setSelected={() => {}} />}
      {threshold && threshold === 'line' && <LegendElement type="thresholdLine" selected={false} setSelected={() => {}} />}
      {average && <LegendElement type="average" selected={false} setSelected={() => {}} />}
    </div>
  );
}
