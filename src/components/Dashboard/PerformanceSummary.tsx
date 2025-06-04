import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts';

interface PerformanceSummaryProps {
  className?: string;
  userName?: string;
}

interface MetricData {
  id: string;
  title: string;
  value: string;
  trend: string;
  trendType: 'positive' | 'negative';
  trendPeriod: string;
  chartData: { name: string; value: number }[];
}

const performanceMetricsData: MetricData[] = [
  {
    id: 'new-cases',
    title: 'NEW CASES',
    value: '104',
    trend: '+14,88%',
    trendType: 'positive' as const,
    trendPeriod: 'Trends last month',
    chartData: [
      { name: 'W1', value: 60 },
      { name: 'W2', value: 75 },
      { name: 'W3', value: 50 },
      { name: 'W4', value: 90 },
      { name: 'W5', value: 104 },
    ],
  },
  {
    id: 'new-tasks',
    title: 'NEW TASKS',
    value: '34',
    trend: '-5,67%',
    trendType: 'negative' as const,
    trendPeriod: 'Trends last month',
    chartData: [
      { name: 'W1', value: 40 },
      { name: 'W2', value: 30 },
      { name: 'W3', value: 50 },
      { name: 'W4', value: 38 },
      { name: 'W5', value: 34 },
    ],
  },
];

const PerformanceSummary: React.FC<PerformanceSummaryProps> = ({ className, userName = 'Peter' }) => {
  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-3 gap-6', className)}>
      <Card className="md:col-span-1 bg-card text-card-foreground p-6 flex flex-col justify-center rounded-lg">
        <div className="flex items-center space-x-3 mb-2">
          <Avatar className="h-12 w-12">
            <AvatarImage src={`https://avatar.vercel.sh/${userName.toLowerCase()}.png`} alt={userName} />
            <AvatarFallback className="bg-primary text-primary-foreground text-lg">{userName.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-xl font-semibold text-foreground">Hello {userName}</p>
            <p className="text-sm text-muted-foreground">New cases are waiting</p>
          </div> 
        </div>
      </Card>

      {performanceMetricsData.map((metric) => (
        <Card key={metric.id} className="bg-card text-card-foreground p-4 rounded-lg flex flex-col justify-between">
          <div>
            <CardTitle className="text-sm font-medium text-muted-foreground tracking-wider">{metric.title}</CardTitle>
            <div className="mt-2 flex items-end justify-between">
              <p className="text-4xl font-bold text-foreground">{metric.value}</p>
              <div className="h-10 w-20">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={metric.chartData}>
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'hsl(var(--background))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)'}} 
                      itemStyle={{ color: metric.trendType === 'positive' ? 'hsl(var(--primary))' : 'hsl(var(--destructive))' }}
                      labelStyle={{ display: 'none' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke={metric.trendType === 'positive' ? 'hsl(var(--primary))' : 'hsl(var(--destructive))'} 
                      strokeWidth={2} 
                      dot={false} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          <div className="mt-3 flex items-center text-xs">
            {metric.trendType === 'positive' ? (
              <TrendingUp className="h-4 w-4 mr-1 text-success" />
            ) : (
              <TrendingDown className="h-4 w-4 mr-1 text-destructive" />
            )}
            <span className={cn(
              'font-semibold',
              metric.trendType === 'positive' ? 'text-success' : 'text-destructive'
            )}>
              {metric.trend}
            </span>
            <span className="ml-1 text-muted-foreground">{metric.trendPeriod}</span>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default PerformanceSummary;
