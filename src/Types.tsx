import { cva } from "class-variance-authority";

const colorScale = [
  '#0a7873',
  '#2c318c',
  '#b8630d',
  '#a12c5e',
  '#5f64bd',
  '#53a34d',
  '#0f5bbf',
  '#521b96',
  '#ab9200',
  '#8f4100',
  '#005235',
  '#8aab24',
  '#0098bb',
  '#5d4eaf',
  '#992e18',
  '#993e72',
  '#00326a',
  '#815ca6',
  '#53253f',
  '#996c12',
]

export const legendElementVariants = cva(
  'text-[10px] flex justify-center items-center text-[#fff]',
  {
    variants: {
      variant: colorScale.reduce((acc, color, index) => {
        acc[`instance${index + 1}`] = `bg-[${color}]`;
        return acc;
      }, {} as Record<string, string>),
      appearance: {
        square: 'w-[14px] h-[14px] rounded-[2px]',
        round: 'w-[10px] h-[10px] rounded-[50%]',
        line: 'w-[10px] h-[2px] rounded-[1px]',
      }
    }
  }
);

export const legendCheckedElementVariants = cva(
  "relative peer appearance-none w-[14px] h-[14px] rounded-[2px] checked:border-0 cursor-pointer",
  {
    variants: {
      variant: colorScale.reduce((acc, color, index) => {
        acc[`instance${index + 1}`] = `bg-[${color}]`;
        return acc;
      }, {} as Record<string, string>),
    }
  }
)

export const legendPositionVariants = cva(
  'm-[10px]',
  {
    variants: {
      position: {
        top: 'flex flex-row',
        bottom: 'flex flex-row',
        right: 'flex flex-col',
        left: 'flex flex-col',
      }
    }
  }
)
