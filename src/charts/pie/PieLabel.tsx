import { VariantProps } from "class-variance-authority";
import { ReactNode } from "react"
import { pieLabelVariants } from "../../Types";

export interface PieLabelProps extends VariantProps<typeof pieLabelVariants> {
  children: ReactNode;
}

export const PieLabel = ({ children, appearance }: PieLabelProps) => {
  return (
    <div className={pieLabelVariants({ appearance })}>
      {children}
    </div>
  )
}
