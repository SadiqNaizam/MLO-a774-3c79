import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Circle } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

interface CalendarEvent {
  id: string;
  time: string;
  title: string;
  duration: string;
  color: string; // Tailwind color class for the vertical bar
  dayGroup: string; // e.g. MON 16
}

const calendarEventsData: CalendarEvent[] = [
  {
    id: 'event1',
    dayGroup: 'MON 16',
    time: '7:00',
    title: 'Meeting for case 1',
    duration: '7:00 - 8.30',
    color: 'bg-green-500',
  },
  {
    id: 'event2',
    dayGroup: 'MON 16',
    time: '11:00',
    title: 'Meeting for case 2',
    duration: '11:00 - 12.30',
    color: 'bg-blue-500',
  },
  {
    id: 'event3',
    dayGroup: 'TUE 17',
    time: '14:00',
    title: 'Meeting for case 3',
    duration: '14:00 - 18.30',
    color: 'bg-primary',
  },
  {
    id: 'event4',
    dayGroup: 'WED 18',
    time: '10:00',
    title: 'Team Sync',
    duration: '10:00 - 10:30',
    color: 'bg-purple-500',
  },
];

interface TaskItem {
  id: string;
  name: string;
  dueDateShort: string; // e.g. 'Ma', 'Tu'
  color: string; // Tailwind color class for the dot
}

const myTasksData: TaskItem[] = [
  { id: 'task1', name: 'Lorem ipsum dolor sit amet consectetur.', dueDateShort: 'Ma', color: 'bg-primary' },
  { id: 'task2', name: 'Lorem ipsum dolor sit.', dueDateShort: 'Ma', color: 'bg-blue-500' },
  { id: 'task3', name: 'Lorem ipsum dolor sit amet.', dueDateShort: 'Ma', color: 'bg-green-500' },
];

const assignedToOthersTasksData: TaskItem[] = [
  { id: 'task4', name: 'Lorem ipsum dolor sit amet, consectetur.', dueDateShort: 'Ma', color: 'bg-primary' },
  { id: 'task5', name: 'Lorem ipsum dolor.', dueDateShort: 'Ma', color: 'bg-purple-500' },
];

interface CalendarWidgetProps {
  className?: string;
}

const CalendarWidget: React.FC<CalendarWidgetProps> = ({ className }) => {
  const groupedEvents = calendarEventsData.reduce<Record<string, CalendarEvent[]>>((acc, event) => {
    if (!acc[event.dayGroup]) {
      acc[event.dayGroup] = [];
    }
    acc[event.dayGroup].push(event);
    return acc;
  }, {});

  return (
    <div className={cn('space-y-6', className)}>
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between py-3 px-4 border-b">
          <CardTitle className="text-base font-semibold">MY CALENDAR</CardTitle>
          <Button variant="default" size="icon" className="h-7 w-7 bg-primary hover:bg-primary/90">
            <Plus className="h-4 w-4 text-primary-foreground" />
          </Button>
        </CardHeader>
        <ScrollArea className="h-[220px]">
          <CardContent className="p-4 space-y-4">
            {Object.entries(groupedEvents).map(([dayGroup, events]) => (
              <div key={dayGroup}>
                <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">{dayGroup}</p>
                <div className="space-y-3">
                  {events.map((event) => (
                    <div key={event.id} className="flex items-start space-x-3">
                      <div className={cn("w-1 h-full rounded-full flex-shrink-0 mt-1", event.color)} style={{ height: 'calc(1.25rem * 1.5)' /* approx height of two lines of text */ }}></div>
                      <div className="flex-grow">
                        <p className="text-xs text-muted-foreground tabular-nums">{event.time}</p>
                        <p className="text-sm font-medium text-foreground leading-tight">{event.title}</p>
                        <p className="text-xs text-muted-foreground">{event.duration}</p>
                      </div>
                    </div>
                  ))}
                </div>
                { Object.keys(groupedEvents)[Object.keys(groupedEvents).length -1] !== dayGroup && <Separator className="my-4"/> }
              </div>
            ))}
          </CardContent>
        </ScrollArea>
      </Card>

      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between py-3 px-4 border-b">
          <CardTitle className="text-base font-semibold">LIST OF MY TASKS</CardTitle>
          <Button variant="default" size="icon" className="h-7 w-7 bg-primary hover:bg-primary/90">
            <Plus className="h-4 w-4 text-primary-foreground" />
          </Button>
        </CardHeader>
        <ScrollArea className="h-[150px]">
        <CardContent className="p-4 space-y-3">
          {myTasksData.map((task) => (
            <div key={task.id} className="flex items-center space-x-3">
              <Circle className={cn("h-2.5 w-2.5 flex-shrink-0", task.color)} fill={task.color} strokeWidth={0}/>
              <p className="text-sm text-foreground flex-grow truncate">{task.name}</p>
              <span className="text-xs text-muted-foreground font-medium bg-muted px-1.5 py-0.5 rounded-sm">
                {task.dueDateShort}
              </span>
            </div>
          ))}
        </CardContent>
        </ScrollArea>
      </Card>

      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between py-3 px-4 border-b">
          <CardTitle className="text-base font-semibold">TASK ASSIGNED TO OTHERS</CardTitle>
          <Button variant="default" size="icon" className="h-7 w-7 bg-primary hover:bg-primary/90">
            <Plus className="h-4 w-4 text-primary-foreground" />
          </Button>
        </CardHeader>
        <ScrollArea className="h-[120px]">
        <CardContent className="p-4 space-y-3">
          {assignedToOthersTasksData.map((task) => (
            <div key={task.id} className="flex items-center space-x-3">
              <Circle className={cn("h-2.5 w-2.5 flex-shrink-0", task.color)} fill={task.color} strokeWidth={0}/>
              <p className="text-sm text-foreground flex-grow truncate">{task.name}</p>
              <span className="text-xs text-muted-foreground font-medium bg-muted px-1.5 py-0.5 rounded-sm">
                {task.dueDateShort}
              </span>
            </div>
          ))}
        </CardContent>
        </ScrollArea>
      </Card>
    </div>
  );
};

export default CalendarWidget;
