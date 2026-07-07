"use client";

import {
  BarChart,
  Bar,
  XAxis,
  ResponsiveContainer,
  Cell,
} from "recharts";

const data = [
  { day: "Qui", tasks: 4 },
  { day: "Sex", tasks: 6 },
  { day: "Sáb", tasks: 2 },
  { day: "Dom", tasks: 1 },
  { day: "Seg", tasks: 7 },
  { day: "Ter", tasks: 8 },
  { day: "Qua", tasks: 5 },
];

export default function WeeklyProductivityChart() {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data}>
        <XAxis
          dataKey="day"
          tick={{ fill: "#94A3B8", fontSize: 12 }}
          axisLine={false}
          tickLine={false}
        />

        <Bar
          dataKey="tasks"
          radius={[8, 8, 0, 0]}
        >
          {data.map((_, index) => (
            <Cell
              key={index}
              fill={
                index === data.length - 1
                  ? "#A855F7"
                  : "#6366F1"
              }
            />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}