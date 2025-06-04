import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, Cell } from 'recharts';

interface CaseTypeData {
  name: string;
  value: number;
  fill: string;
}

const caseTypeBreakdownData: CaseTypeData[] = [
  { name: 'Product', value: 76, fill: 'hsl(var(--primary))' }, // Orange-Yellow
  { name: 'Trademark', value: 48, fill: 'hsl(221, 83%, 53%)' }, // Blue (Tailwind's blue-600)
  { name: 'Patent', value: 16, fill: 'hsl(262, 83%, 58%)' },   // Purple (Tailwind's violet-600)
  { name: 'Copyright', value: 5, fill: 'hsl(var(--destructive))' }, // Red
  { name: 'Gray market', value: 2, fill: 'hsl(142, 71%, 45%)' }, // Green (Tailwind's green-600)
];

interface CountryCaseData {
  country: string;
  activeCases: number;
  trendValue: string; 
  trendType: 'positive' | 'negative';
}

const countryCasesData: CountryCaseData[] = [
  { country: 'Sweden', activeCases: 76, trendValue: '+16,7%', trendType: 'positive' as const },
  { country: 'USA', activeCases: 45, trendValue: '+3,23%', trendType: 'positive' as const },
  { country: 'Germany', activeCases: 18, trendValue: '-5,44%', trendType: 'negative' as const }, // Made value higher to look more realistic
  { country: 'UK', activeCases: 33, trendValue: '+8.1%', trendType: 'positive' as const },
  { country: 'Canada', activeCases: 25, trendValue: '-2.5%', trendType: 'negative' as const },
];

interface CaseBreakdownChartProps {
  className?: string;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-popover text-popover-foreground p-2 shadow-md rounded-md border border-border">
        <p className="label font-semibold">{`${label} : ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const CaseBreakdownChart: React.FC<CaseBreakdownChartProps> = ({ className }) => {
  return (
    <div className={cn('grid grid-cols-1 lg:grid-cols-2 gap-6', className)}>
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between py-3 px-4 border-b">
          <CardTitle className="text-base font-semibold">CASE TYPE BREAKDOWN</CardTitle>
          <Button variant="link" size="sm" className="text-primary hover:text-primary/80 px-0">
            Full report
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </CardHeader>
        <CardContent className="p-4">
          <div style={{ width: '100%', height: 250 }}>
            <ResponsiveContainer>
              <BarChart data={caseTypeBreakdownData} layout="vertical" margin={{ top: 5, right: 10, left: 50, bottom: 5 }}>
                <XAxis type="number" hide />
                <YAxis type="category" dataKey="name" hide /> 
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(var(--muted))' }}/>
                <Bar dataKey="value" barSize={12} radius={[0, 6, 6, 0]}>
                  {caseTypeBreakdownData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
            {caseTypeBreakdownData.map((item) => (
              <div key={item.name} className="flex items-center">
                <span className="h-2 w-2 rounded-full mr-2" style={{ backgroundColor: item.fill }} />
                <span className="text-muted-foreground">{item.name}</span>
                <span className="ml-auto font-medium text-foreground">{item.value}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between py-3 px-4 border-b">
          <CardTitle className="text-base font-semibold">NUMBER OF CASES (Per Country)</CardTitle>
          <Button variant="link" size="sm" className="text-primary hover:text-primary/80 px-0">
            See all
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </CardHeader>
        <CardContent className="p-4 space-y-3">
          {countryCasesData.map((item) => (
            <div key={item.country} className="flex items-center justify-between text-sm">
              <span className="text-foreground font-medium">{item.country}</span>
              <div className="flex items-center">
                <span className="text-foreground mr-2 tabular-nums">{item.activeCases}</span>
                {item.trendType === 'positive' ? (
                  <ArrowUpRight className="h-4 w-4 text-success" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 text-destructive" />
                )}
                <span className={cn(
                  'ml-1 text-xs tabular-nums',
                  item.trendType === 'positive' ? 'text-success' : 'text-destructive'
                )}>
                  {item.trendValue}
                </span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default CaseBreakdownChart;
