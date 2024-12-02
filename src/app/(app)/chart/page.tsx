"use client"
import React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const description = "An interactive bar chart"

// Updated data with current dates up to November 11, 2024
const chartData = [
  { date: "2024-09-11", desktop: 222, mobile: 150 },
  { date: "2024-09-12", desktop: 97, mobile: 180 },
  { date: "2024-09-13", desktop: 167, mobile: 120 },
  { date: "2024-09-14", desktop: 242, mobile: 260 },
  { date: "2024-09-15", desktop: 373, mobile: 290 },
  { date: "2024-09-16", desktop: 301, mobile: 340 },
  { date: "2024-09-17", desktop: 245, mobile: 180 },
  { date: "2024-09-18", desktop: 409, mobile: 320 },
  { date: "2024-09-19", desktop: 59, mobile: 110 },
  { date: "2024-09-20", desktop: 261, mobile: 190 },
  { date: "2024-10-01", desktop: 327, mobile: 350 },
  { date: "2024-10-02", desktop: 292, mobile: 210 },
  { date: "2024-10-03", desktop: 342, mobile: 380 },
  { date: "2024-10-04", desktop: 137, mobile: 220 },
  { date: "2024-10-05", desktop: 120, mobile: 170 },
  { date: "2024-10-06", desktop: 138, mobile: 190 },
  { date: "2024-10-07", desktop: 446, mobile: 360 },
  { date: "2024-10-08", desktop: 364, mobile: 410 },
  { date: "2024-10-09", desktop: 243, mobile: 180 },
  { date: "2024-10-10", desktop: 89, mobile: 150 },
  { date: "2024-11-01", desktop: 138, mobile: 230 },
  { date: "2024-11-02", desktop: 387, mobile: 290 },
  { date: "2024-11-03", desktop: 215, mobile: 250 },
  { date: "2024-11-04", desktop: 75, mobile: 130 },
  { date: "2024-11-05", desktop: 383, mobile: 420 },
  { date: "2024-11-06", desktop: 122, mobile: 180 },
  { date: "2024-11-07", desktop: 315, mobile: 240 },
  { date: "2024-11-08", desktop: 454, mobile: 380 },
  { date: "2024-11-09", desktop: 165, mobile: 220 },
  { date: "2024-11-10", desktop: 293, mobile: 310 },
  { date: "2024-11-11", desktop: 247, mobile: 190 },
]

const chartConfig = {
  views: {
    label: "Page Views",
  },
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export default function Chart() {
  const [activeChart, setActiveChart] = React.useState<keyof typeof chartConfig>("desktop")

  const total = React.useMemo(
    () => ({
      desktop: chartData.reduce((acc, curr) => acc + curr.desktop, 0),
      mobile: chartData.reduce((acc, curr) => acc + curr.mobile, 0),
    }),
    []
  )
  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Bar Chart - Interactive</CardTitle>
          <CardDescription>
            Showing total visitors for the last 3 months
          </CardDescription>
        </div>
        <div className="flex">
          {["desktop", "mobile"].map((key) => {
            const chart = key as keyof typeof chartConfig
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            )
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }}
                />
              }
            />
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

