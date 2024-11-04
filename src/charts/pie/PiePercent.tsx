import { PolarAngleAxis, RadialBar, RadialBarChart } from "recharts";

export interface PiePercentProps {
  value: number;
  total: number;
}

/*
  실제로는 PieChart가 아니라 RadialBarChart를 사용하여 구현하였다.
  실제로 PiePercent는 PieChart에 해당하지도 않고 구현이 가능하지도 않다.
*/
export const PiePercent: React.FC<PiePercentProps> = ({ value, total }) => {

  return (
    <div className="relative w-[400px] h-[400px]">
      <RadialBarChart
        width={400}
        height={400}
        cx="50%"
        cy="50%"
        innerRadius="80%"
        outerRadius="100%"
        barSize={50}
        data={[
          { name: "percent", value: value * 100 / total, fill: "#0088FE" },
        ]}
        startAngle={90}
        endAngle={-270}
      >
        <PolarAngleAxis
          type="number"
          domain={[0, 100]}
          angleAxisId={0}
          tick={false}
        />
        <RadialBar
          background
          cornerRadius={50}
          dataKey="value"
        />
      </RadialBarChart>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
        text-2xl font-bold text-blue-500"
      >
        {`${value} / ${total}`}
      </div>
    </div>
  )
}
