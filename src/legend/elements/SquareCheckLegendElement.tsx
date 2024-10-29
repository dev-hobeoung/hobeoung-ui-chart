import { VariantProps } from "class-variance-authority";
import { legendCheckedElementVariants } from "../../Types";
import CheckboxCheckIcon from "../../assets/ICON_CHECKBOX_CHECK.svg?react"

export interface SquareCheckLegendElementProps extends VariantProps<typeof legendCheckedElementVariants> {
  label: string;
  checked: boolean;
  onChange?: (checked: boolean) => void;
}

export const SquareCheckLegendElement: React.FC<SquareCheckLegendElementProps> = ({
  label,
  checked,
  variant,
  onChange,
}: SquareCheckLegendElementProps) => {
  return (
    <div className="flex items-center gap-[10px]">
      <span className="relative flex">
        <input
          id="square-check-legend-element-checkbox"
          className={legendCheckedElementVariants({ variant })}
          type="checkbox"
          checked={checked}
          onChange={() => {
            if(onChange) onChange(!checked);
          }}
        />
        <CheckboxCheckIcon
          className="absolute top-[-0.5px] left-0.5 pointer-events-none block"
          width={10}
        />
        <span
          className="
            absolute top-0 left-0 w-[14px] h-[14px] rounded-[2px] bg-[#001936]
            opacity-[31%] pointer-events-none block peer-checked:hidden
          "
        />
      </span>
      <span>
        {label}
      </span>
    </div>
  )
}
