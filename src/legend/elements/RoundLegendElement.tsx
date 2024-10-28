import { VariantProps } from "class-variance-authority";
import { legendElementVariants } from "../../Types";

export interface RoundLegendElementProps extends VariantProps<typeof legendElementVariants> {
  label: string;
}

export const RoundLegendElement: React.FC<RoundLegendElementProps> = ({ label, variant }: RoundLegendElementProps) => {
  return (
    <div className="flex items-center gap-[10px]">
      <span>
        <div className={legendElementVariants({ variant, appearance: "round" })} />
      </span>
      <span>
        {label}
      </span>
    </div>
  )
}
