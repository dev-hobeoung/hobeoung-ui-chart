import { VariantProps } from "class-variance-authority";
import { legendElementVariants } from "../../Types";

export interface LineLegendElementProps extends VariantProps<typeof legendElementVariants> {
  label?: string;
}

export const LineLegendElement: React.FC<LineLegendElementProps> = ({
  label,
  variant,
}: LineLegendElementProps) => {
  return (
    <div className="flex gap-[10px] items-center">
      <span>
        <div className={legendElementVariants({ variant, appearance: "line" })} />
      </span>
      <span className="whitespace-nowrap">
        {label}
      </span>
    </div>
  )
}
