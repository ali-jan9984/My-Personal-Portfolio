import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/Components/ui/card";
import {
  ChartContainer,
} from "@/Components/ui/chart";

export const description = "Advanced interactive bar chart";

const chartData = [
  { date: "2024-04-01", desktop: 222, mobile: 150 },
  { date: "2024-04-02", desktop: 260, mobile: 180 },
  { date: "2024-04-03", desktop: 290, mobile: 210 },
  // Add more data points as needed
];

const chartConfig = {
  views: {
    label: "Page Views",
  },
  desktop: {
    label: "Desktop",
    color: "#4285F4", // Custom blue color for desktop
  },
  mobile: {
    label: "Mobile",
    color: "#FBBC05", // Custom yellow color for mobile
  },
};

export function Updown() {
  const [activeChart, setActiveChart] = React.useState<keyof typeof chartConfig>("desktop");

  const total = React.useMemo(
    () => ({
      desktop: chartData.reduce((acc, curr) => acc + curr.desktop, 0),
      mobile: chartData.reduce((acc, curr) => acc + curr.mobile, 0),
    }),
    []
  );

  return (
    <Card className="rounded-lg shadow-lg bg-gradient-to-br from-blue-500 to-indigo-500 text-white">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle className="text-2xl font-semibold">Advanced Visitor Statistics</CardTitle>
          <CardDescription>
            Track trends and insights for the last 3 months.
          </CardDescription>
        </div>
        <div className="flex">
          {["desktop", "mobile"].map((key) => {
            const chart = key as keyof typeof chartConfig;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className={`relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-l sm:border-t-0 sm:px-8 sm:py-6 ${activeChart === chart ? 'bg-blue-700 text-white shadow-md' : 'bg-white text-blue-900'}`}
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs uppercase">{chartConfig[chart].label}</span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total.toLocaleString()}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <div className="aspect-auto h-[250px] w-full">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  });
                }}
              />
              <YAxis />
              <Tooltip
                contentStyle={{ backgroundColor: "#333", color: "#fff", borderRadius: "8px" }}
                labelFormatter={(value) => {
                  return new Date(value).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  });
                }}
                formatter={(value, name) => [`${value.toLocaleString()}`, name]}
              />
              <Legend
                verticalAlign="top"
                height={36}
                wrapperStyle={{
                  color: "white",
                  fontWeight: "bold",
                  paddingBottom: "20px",
                }}
              />
              <Bar
                dataKey={activeChart}
                fill={chartConfig[activeChart].color}
                radius={[8, 8, 0, 0]}
                animationDuration={700}
                onMouseOver={(data, index) => console.log(`Hovered on ${data.date}`)}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
