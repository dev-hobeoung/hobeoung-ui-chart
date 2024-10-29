import { VariantProps } from "class-variance-authority";
import { legendElementVariants } from "../../Types";
import { HTMLAttributes } from "react";
import { LegendType } from "../Legend";
import { NumberLegendElement } from "./NumberLegendElement";
import { TextLegendElement } from "./TextLegendElement";
import { RoundLegendElement } from "./RoundLegendElement";
import { LineLegendElement } from "./LineLegendElement";
import { SquareLegendElement } from "./SquareLegendElement";
import { SquareCheckLegendElement } from "./SquareCheckLegendElement";
import { AverageLegendElement } from "./AverageLegendElement";
import { ThresholdIconLegendElement } from "./ThresholdIconLegendElement";
import { ThresholdLineLegendElement } from "./ThresholdLineLegendElement";

export interface LegendElementProps extends
  VariantProps<typeof legendElementVariants>, HTMLAttributes<HTMLDivElement>
{
  type: LegendType;
  label?: string;
  index?: number;
  selected: boolean;
  setSelected: (selected: boolean) => void;
}

export const LegendElement: React.FC<LegendElementProps> = ({
  type,
  label,
  index,
  variant,
  selected,
  setSelected,
  ...divProps
}: LegendElementProps) => {
  return (
    <div className="cursor-pointer"
      onClick={() => {
        if (setSelected) setSelected(!selected);
      }}
      {...divProps}
    >
      {/* 컴포넌트 반환하는 함수 별도로 놓기 싫어서 switch-case 대체 */}
      {type === 'number' && (
        <NumberLegendElement
          label={label}
          number={index ? index + 1 : undefined}
          variant={variant}
          appearance="square"
        />
      )}
      {type === 'text' && <TextLegendElement label={label} />}
      {type === 'round' && <RoundLegendElement label={label} variant={variant} />}
      {type === 'line' && <LineLegendElement label={label} variant={variant} />}
      {type === 'square' && <SquareLegendElement label={label} variant={variant} />}
      {type === 'squareCheck' && (
        <SquareCheckLegendElement
          label={label}
          variant={variant}
          selected={selected}
          setSelected={setSelected}
        />
      )}
      {type === 'average' && <AverageLegendElement />}
      {type === 'thresholdIcon' && <ThresholdIconLegendElement />}
      {type === 'thresholdLine' && <ThresholdLineLegendElement />}
    </div>
  )
}
