import * as React from 'react';
import { TrendingUp } from 'lucide-react';
import { Label, LabelList, Pie, PieChart } from 'recharts';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

export const description = 'A pie chart with a label list';

const chartData = [
  { cuisine: 'taiwanese', count: 275, fill: 'var(--color-taiwanese)' },
  { cuisine: 'korean', count: 200, fill: 'var(--color-korean)' },
  { cuisine: 'japanese', count: 287, fill: 'var(--color-japanese)' },
  { cuisine: 'american', count: 173, fill: 'var(--color-american)' },
  { cuisine: 'italian', count: 190, fill: 'var(--color-italian)' },
];

const chartConfig = {
  count: {
    label: '數量',
  },
  taiwanese: {
    label: '台灣料理',
    color: 'hsl(var(--chart-1))',
  },
  korean: {
    label: '韓式料理',
    color: 'hsl(var(--chart-2))',
  },
  japanese: {
    label: '日式料理',
    color: 'hsl(var(--chart-3))',
  },
  american: {
    label: '美式料理',
    color: 'hsl(var(--chart-4))',
  },
  italian: {
    label: '義式料理',
    color: 'hsl(var(--chart-5))',
  },
} satisfies ChartConfig;

export function PieGraph() {
  const totalDishes = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.count, 0);
  }, []);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>圓餅圖 - 中心文字</CardTitle>
        <CardDescription>2024年6月 - 12月</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[360px] [&_.recharts-text]:fill-background"
        >
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="count" nameKey="cuisine" innerRadius={60} strokeWidth={5}>
              <LabelList
                dataKey="cuisine"
                className="fill-background"
                stroke="none"
                fontSize={12}
                formatter={(value: keyof typeof chartConfig) => chartConfig[value]?.label}
              />
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                        <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">
                          {totalDishes.toLocaleString()}
                        </tspan>
                        <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
                          料理數量
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          本月上升 5.2% <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">顯示過去6個月的總料理數量</div>
      </CardFooter>
    </Card>
  );
}
