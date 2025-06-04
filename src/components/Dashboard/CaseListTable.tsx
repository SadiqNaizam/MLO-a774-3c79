import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Paperclip, ChevronRight, Users } from 'lucide-react';

type Priority = 'Low' | 'Medium' | 'High';

interface CaseItem {
  id: string;
  name: string;
  dates: string;
  priority: Priority;
  attachment?: { name: string };
  assignee?: { name: string; avatarUrl?: string; initials: string };
  selected: boolean;
}

const initialCasesData: CaseItem[] = [
  {
    id: 'case1',
    name: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
    dates: 'May 18,2024 - May 25,2024',
    priority: 'Low' as const,
    attachment: { name: 'Requirements.doc' },
    assignee: undefined, // No assignee in first row of image, shows Users icon placeholder
    selected: true,
  },
  {
    id: 'case2',
    name: 'Lorem ipsum dolor sit amet, consectetur',
    dates: 'May 18,2024 - May 25,2024',
    priority: 'Medium' as const,
    attachment: { name: 'New case.doc' },
    assignee: { name: 'Lana Aris', initials: 'LA', avatarUrl: 'https://avatar.vercel.sh/lana.png' },
    selected: false,
  },
  {
    id: 'case3',
    name: 'Lorem ipsum dolor sit amet',
    dates: 'May 19,2024 - May 26,2024',
    priority: 'Low' as const,
    attachment: { name: 'Nike fraud.doc' },
    assignee: { name: 'John Doe', initials: 'JD', avatarUrl: 'https://avatar.vercel.sh/john.png' },
    selected: false,
  },
];

interface CaseListTableProps {
  className?: string;
}

const CaseListTable: React.FC<CaseListTableProps> = ({ className }) => {
  const [casesData, setCasesData] = useState<CaseItem[]>(initialCasesData);

  const handleSelectCase = (caseId: string) => {
    setCasesData((prevCases) =>
      prevCases.map((c) => (c.id === caseId ? { ...c, selected: !c.selected } : c))
    );
  };

  const handleSelectAll = (checked: boolean | 'indeterminate') => {
    if (checked === 'indeterminate') return;
    setCasesData(prevCases => prevCases.map(c => ({...c, selected: checked})))
  }

  const allSelected = casesData.every(c => c.selected);
  const someSelected = casesData.some(c => c.selected) && !allSelected;

  const getPriorityBadgeClass = (priority: Priority): string => {
    switch (priority) {
      case 'Low':
        return 'bg-green-100 text-green-700 hover:bg-green-200 border-green-300';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200 border-yellow-300'; // In image it's orange-ish, matching primary accent might be better
                                                                               // For now using yellow as 'Medium'
      case 'High':
        return 'bg-red-100 text-red-700 hover:bg-red-200 border-red-300';
      default:
        return 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-gray-300';
    }
  };

  return (
    <Card className={cn('w-full', className)}>
      <CardHeader className="flex flex-row items-center justify-between py-3 px-4 border-b">
        <CardTitle className="text-base font-semibold">LIST OF CASES TO BE ACCEPTED</CardTitle>
        <Button variant="link" size="sm" className="text-primary hover:text-primary/80 px-0">
          Full list
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="text-xs uppercase tracking-wider">
              <TableHead className="w-[50px] px-4">
                <Checkbox 
                  checked={allSelected ? true : (someSelected ? 'indeterminate' : false)}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead className="min-w-[200px] px-2">Name</TableHead>
              <TableHead className="px-2">Dates</TableHead>
              <TableHead className="px-2">Priority</TableHead>
              <TableHead className="px-2">Attachment</TableHead>
              <TableHead className="text-right px-4">Assignee</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {casesData.map((caseItem) => (
              <TableRow key={caseItem.id} className="text-sm">
                <TableCell className="px-4">
                  <Checkbox
                    checked={caseItem.selected}
                    onCheckedChange={() => handleSelectCase(caseItem.id)}
                  />
                </TableCell>
                <TableCell className="font-medium py-3 px-2 truncate max-w-xs text-foreground">{caseItem.name}</TableCell>
                <TableCell className="text-muted-foreground px-2">{caseItem.dates}</TableCell>
                <TableCell className="px-2">
                  <Badge variant="outline" className={cn('font-semibold', getPriorityBadgeClass(caseItem.priority))}>
                    {caseItem.priority}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground px-2">
                  {caseItem.attachment ? (
                    <div className="flex items-center">
                      <Paperclip className="h-4 w-4 mr-2 text-gray-400" />
                      <span>{caseItem.attachment.name}</span>
                    </div>
                  ) : (
                    <span>-</span>
                  )}
                </TableCell>
                <TableCell className="text-right px-4">
                  {caseItem.assignee ? (
                    <Avatar className="h-8 w-8 ml-auto">
                      <AvatarImage src={caseItem.assignee.avatarUrl} alt={caseItem.assignee.name} />
                      <AvatarFallback className="bg-primary/20 text-primary font-semibold">
                        {caseItem.assignee.initials}
                      </AvatarFallback>
                    </Avatar>
                  ) : (
                    <Users className="h-5 w-5 text-muted-foreground ml-auto" />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default CaseListTable;
