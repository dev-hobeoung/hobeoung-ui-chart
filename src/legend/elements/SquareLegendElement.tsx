import { VariantProps } from "class-variance-authority";
import { legendElementVariants } from "../../Types";
import { cn } from "../../utils/StyleUtils";

export interface SquareLegendElementProps extends VariantProps<typeof legendElementVariants> {
  label?: string;
}

export const SquareLegendElement: React.FC<SquareLegendElementProps> = ({ label, variant }: SquareLegendElementProps) => {
  return (
    <div className="flex items-center gap-[10px]">
      <span>
        <div className={cn(legendElementVariants({ variant, appearance: "square" }))} />
      </span>
      <span className="whitespace-nowrap">
        {label}
      </span>
    </div>
  );
}
