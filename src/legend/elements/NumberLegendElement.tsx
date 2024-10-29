import { VariantProps } from "class-variance-authority";
import { legendElementVariants } from "../../Types";

export interface NumberLegendElementProps extends VariantProps<typeof legendElementVariants> {
  label?: string;
  number?: number;
}

export const NumberLegendElement: React.FC<NumberLegendElementProps> = ({ label, number, variant }: NumberLegendElementProps) => {
  return (
    <div className="flex items-center gap-[10px]">
      <span>
        <div className={legendElementVariants({ variant, appearance: "square" })}>
          {number}
        </div>
      </span>
      <span className="whitespace-nowrap">
        {label}
      </span>
    </div>
  )
}
