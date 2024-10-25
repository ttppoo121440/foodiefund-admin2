'use client';

import * as React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

export const description = 'An interactive bar chart';

const chartData = [
  { date: '2024-08-01', desktop: 222, mobile: 150 },
  { date: '2024-08-02', desktop: 97, mobile: 180 },
  { date: '2024-08-03', desktop: 167, mobile: 120 },
  { date: '2024-08-04', desktop: 242, mobile: 260 },
  { date: '2024-08-05', desktop: 373, mobile: 290 },
  { date: '2024-08-06', desktop: 301, mobile: 340 },
  { date: '2024-08-07', desktop: 245, mobile: 180 },
  { date: '2024-08-08', desktop: 409, mobile: 320 },
  { date: '2024-08-09', desktop: 59, mobile: 110 },
  { date: '2024-08-10', desktop: 261, mobile: 190 },
  { date: '2024-08-11', desktop: 327, mobile: 350 },
  { date: '2024-08-12', desktop: 292, mobile: 210 },
  { date: '2024-08-13', desktop: 342, mobile: 380 },
  { date: '2024-08-14', desktop: 137, mobile: 220 },
  { date: '2024-08-15', desktop: 120, mobile: 170 },
  { date: '2024-08-16', desktop: 138, mobile: 190 },
  { date: '2024-08-17', desktop: 446, mobile: 360 },
  { date: '2024-08-18', desktop: 364, mobile: 410 },
  { date: '2024-08-19', desktop: 243, mobile: 180 },
  { date: '2024-08-20', desktop: 89, mobile: 150 },
  { date: '2024-08-21', desktop: 137, mobile: 200 },
  { date: '2024-08-22', desktop: 224, mobile: 170 },
  { date: '2024-08-23', desktop: 138, mobile: 230 },
  { date: '2024-08-24', desktop: 387, mobile: 290 },
  { date: '2024-08-25', desktop: 215, mobile: 250 },
  { date: '2024-08-26', desktop: 75, mobile: 130 },
  { date: '2024-08-27', desktop: 383, mobile: 420 },
  { date: '2024-08-28', desktop: 122, mobile: 180 },
  { date: '2024-08-29', desktop: 315, mobile: 240 },
  { date: '2024-08-30', desktop: 454, mobile: 380 },
  { date: '2024-08-31', desktop: 165, mobile: 220 },
  { date: '2024-09-01', desktop: 293, mobile: 310 },
  { date: '2024-09-02', desktop: 247, mobile: 190 },
  { date: '2024-09-03', desktop: 385, mobile: 420 },
  { date: '2024-09-04', desktop: 481, mobile: 390 },
  { date: '2024-09-05', desktop: 498, mobile: 520 },
  { date: '2024-09-06', desktop: 388, mobile: 300 },
  { date: '2024-09-07', desktop: 149, mobile: 210 },
  { date: '2024-09-08', desktop: 227, mobile: 180 },
  { date: '2024-09-09', desktop: 293, mobile: 330 },
  { date: '2024-09-10', desktop: 335, mobile: 270 },
  { date: '2024-09-11', desktop: 197, mobile: 240 },
  { date: '2024-09-12', desktop: 197, mobile: 160 },
  { date: '2024-09-13', desktop: 448, mobile: 490 },
  { date: '2024-09-14', desktop: 473, mobile: 380 },
  { date: '2024-09-15', desktop: 338, mobile: 400 },
  { date: '2024-09-16', desktop: 499, mobile: 420 },
  { date: '2024-09-17', desktop: 315, mobile: 350 },
  { date: '2024-09-18', desktop: 235, mobile: 180 },
  { date: '2024-09-19', desktop: 177, mobile: 230 },
  { date: '2024-09-20', desktop: 82, mobile: 140 },
  { date: '2024-09-21', desktop: 81, mobile: 120 },
  { date: '2024-09-22', desktop: 252, mobile: 290 },
  { date: '2024-09-23', desktop: 294, mobile: 220 },
  { date: '2024-09-24', desktop: 201, mobile: 250 },
  { date: '2024-09-25', desktop: 213, mobile: 170 },
  { date: '2024-09-26', desktop: 420, mobile: 460 },
  { date: '2024-09-27', desktop: 233, mobile: 190 },
  { date: '2024-09-28', desktop: 78, mobile: 130 },
  { date: '2024-09-29', desktop: 340, mobile: 280 },
  { date: '2024-09-30', desktop: 178, mobile: 230 },
  { date: '2024-10-01', desktop: 178, mobile: 200 },
  { date: '2024-10-02', desktop: 470, mobile: 410 },
  { date: '2024-10-03', desktop: 103, mobile: 160 },
  { date: '2024-10-04', desktop: 439, mobile: 380 },
  { date: '2024-10-05', desktop: 88, mobile: 140 },
  { date: '2024-10-06', desktop: 294, mobile: 250 },
  { date: '2024-10-07', desktop: 323, mobile: 370 },
  { date: '2024-10-08', desktop: 385, mobile: 320 },
  { date: '2024-10-09', desktop: 438, mobile: 480 },
  { date: '2024-10-10', desktop: 155, mobile: 200 },
  { date: '2024-10-11', desktop: 92, mobile: 150 },
  { date: '2024-10-12', desktop: 492, mobile: 420 },
  { date: '2024-10-13', desktop: 81, mobile: 130 },
  { date: '2024-10-14', desktop: 426, mobile: 380 },
  { date: '2024-10-15', desktop: 307, mobile: 350 },
  { date: '2024-10-16', desktop: 371, mobile: 310 },
  { date: '2024-10-17', desktop: 475, mobile: 520 },
  { date: '2024-10-18', desktop: 107, mobile: 170 },
  { date: '2024-10-19', desktop: 341, mobile: 290 },
  { date: '2024-10-20', desktop: 408, mobile: 450 },
  { date: '2024-10-21', desktop: 169, mobile: 210 },
  { date: '2024-10-22', desktop: 317, mobile: 270 },
  { date: '2024-10-23', desktop: 480, mobile: 530 },
  { date: '2024-10-24', desktop: 132, mobile: 180 },
  { date: '2024-10-25', desktop: 141, mobile: 190 },
  { date: '2024-10-26', desktop: 434, mobile: 380 },
  { date: '2024-10-27', desktop: 448, mobile: 490 },
  { date: '2024-10-28', desktop: 149, mobile: 200 },
  { date: '2024-10-29', desktop: 103, mobile: 160 },
  { date: '2024-10-30', desktop: 446, mobile: 400 },
  { date: '2024-10-31', desktop: 162, mobile: 220 },
];

const chartConfig = {
  views: {
    label: '頁面瀏覽量',
  },
  desktop: {
    label: '桌面',
    color: 'hsl(var(--chart-1))',
  },
  mobile: {
    label: '移動端',
    color: 'hsl(var(--chart-2))',
  },
} satisfies ChartConfig;

export function BarGraph() {
  const [activeChart, setActiveChart] = React.useState<keyof typeof chartConfig>('desktop');

  const total = React.useMemo(
    () => ({
      desktop: chartData.reduce((acc, curr) => acc + curr.desktop, 0),
      mobile: chartData.reduce((acc, curr) => acc + curr.mobile, 0),
    }),
    [],
  );

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>長條圖 - 互動式</CardTitle>
          <CardDescription>顯示過去 3 個月的訪客總數</CardDescription>
        </div>
        <div className="flex">
          {['desktop', 'mobile'].map((key) => {
            const chart = key as keyof typeof chartConfig;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">{chartConfig[chart].label}</span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer config={chartConfig} className="aspect-auto h-[280px] w-full">
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
                const date = new Date(value);
                return date.toLocaleDateString('zh-TW', {
                  month: 'short',
                  day: 'numeric',
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString('zh-TW', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    });
                  }}
                />
              }
            />
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
