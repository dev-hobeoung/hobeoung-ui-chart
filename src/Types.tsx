import { cva } from "class-variance-authority";

export const colorVariantDef = {
  instance1: 'bg-[#0a7873]',
  instance2: 'bg-[#2c318c]',
  instance3: 'bg-[#b8630d]',
  instance4: 'bg-[#a12c5e]',
  instance5: 'bg-[#5f64bd]',
  instance6: 'bg-[#53a34d]',
  instance7: 'bg-[#0f5bbf]',
  instance8: 'bg-[#521b96]',
  instance9: 'bg-[#ab9200]',
  instance10: 'bg-[#8f4100]',
  instance11: 'bg-[#005235]',
  instance12: 'bg-[#8aab24]',
  instance13: 'bg-[#0098bb]',
  instance14: 'bg-[#5d4eaf]',
  instance15: 'bg-[#992e18]',
  instance16: 'bg-[#993e72]',
  instance17: 'bg-[#00326a]',
  instance18: 'bg-[#815ca6]',
  instance19: 'bg-[#53253f]',
  instance20: 'bg-[#996c12]',
}

export const bgClassNameToColor = (bgClassName: string) => {
  return bgClassName.match(/#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})/)?.[0] || "";
}

export const piePercentVariants = cva(
  "",
  {
    variants: {
      variant: colorVariantDef
    },
  }
);

export const pieLabelVariants = cva(
  "absolute transform -translate-x-1/2 -translate-y-1/2",
  {
    variants: {
      appearance: {
        full: 'top-1/2 left-1/2',
        half: 'top-[40%] left-1/2',
      }
    }
  }
);

export const legendElementVariants = cva(
  'text-[10px] flex justify-center items-center text-[#fff]',
  {
    variants: {
      variant: colorVariantDef,
      appearance: {
        square: 'w-[14px] h-[14px] rounded-[2px]',
        round: 'w-[10px] h-[10px] rounded-[50%]',
        line: 'w-[10px] h-[3px] rounded-[1px]',
        check: 'relative peer appearance-none w-[14px] h-[14px] rounded-[2px] checked:border-0 cursor-pointer'
      }
    }
  }
);

export const legendPositionVariants = cva(
  'm-[10px]',
  {
    variants: {
      position: {
        top: 'flex flex-row gap-[12px]',
        bottom: 'flex flex-row gap-[12px]',
        right: 'flex flex-col',
        left: 'flex flex-col',
      }
    }
  }
)
