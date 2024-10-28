import { VariantProps } from "class-variance-authority";
import { legendElementVariants } from "../../Types";

export interface LineLegendElementProps extends VariantProps<typeof legendElementVariants> {
  label: string;
}

export const LineLegendElement: React.FC<LineLegendElementProps> = ({ label, variant }: LineLegendElementProps) => {
  return (
    <div className="flex items-center gap-[10px]">
      <span>
        <div className={legendElementVariants({ variant, appearance: "line" })} />
      </span>
      <span>
        {label}
      </span>
    </div>
  )
}
