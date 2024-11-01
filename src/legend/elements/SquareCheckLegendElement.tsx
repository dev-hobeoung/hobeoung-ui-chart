import { VariantProps } from "class-variance-authority";
import CheckboxCheckIcon from "../../assets/ICON_CHECKBOX_CHECK.svg?react"
import { legendElementVariants } from "../../Types";

export interface SquareCheckLegendElementProps extends VariantProps<typeof legendElementVariants> {
  label?: string;
  selected: boolean;
  setSelected: (selected: boolean) => void;
}

export const SquareCheckLegendElement: React.FC<SquareCheckLegendElementProps> = ({
  label,
  variant,
  selected,
  setSelected,
}: SquareCheckLegendElementProps) => {
  return (
    <div
      className="flex items-center gap-[10px] cursor-pointer"
      onClick={() => {
        if(setSelected) setSelected(!selected);
      }}
    >
      <span className="relative flex">
        <input
          id="square-check-legend-element-checkbox"
          className={legendElementVariants({ variant, appearance: "check" })}
          type="checkbox"
          checked={selected}
          onChange={e => {
            e.stopPropagation();
            if(setSelected) setSelected(!selected);
          }}
        />
        <CheckboxCheckIcon
          className="absolute top-[-0.5px] left-0.5 pointer-events-none block"
          width={10}
        />
      </span>
      <span className="whitespace-nowrap">
        {label}
      </span>
    </div>
  )
}
