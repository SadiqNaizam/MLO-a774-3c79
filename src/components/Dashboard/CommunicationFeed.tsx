import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ChevronRight, Dot } from 'lucide-react';

interface Message {
  id: string;
  sender: { name: string; avatarUrl?: string; initials: string };
  messageSnippet: string;
  timestamp: string;
  isNew?: boolean;
}

const messagesData: Message[] = [
  {
    id: 'msg1',
    sender: { name: 'Mark Wahlberg', initials: 'MW', avatarUrl: 'https://avatar.vercel.sh/mark.png' },
    messageSnippet: 'Lorem ipsum dolor sit amet consectetur. Ut turpis lectus adipiscing leo leo in non tristique. Nulla orci...',
    timestamp: '2 days ago',
    isNew: true,
  },
  {
    id: 'msg2',
    sender: { name: 'Leonardo DiCaprio', initials: 'LD', avatarUrl: 'https://avatar.vercel.sh/leo.png' },
    messageSnippet: 'Lorem ipsum dolor sit amet consectetur. Ut turpis lectus adipiscing leo leo in non tristique. Nulla orci...',
    timestamp: '5 days ago',
    isNew: false,
  },
   {
    id: 'msg3',
    sender: { name: 'Erik Gunsel', initials: 'EG', avatarUrl: 'https://avatar.vercel.sh/erik.png' }, // from sidebar recent messages
    messageSnippet: 'Can we discuss the new proposal for Project X? I have some ideas.',
    timestamp: '1 hour ago',
    isNew: true,
  },
];

interface CommunicationFeedProps {
  className?: string;
}

const CommunicationFeed: React.FC<CommunicationFeedProps> = ({ className }) => {
  return (
    <Card className={cn('w-full', className)}>
      <CardHeader className="flex flex-row items-center justify-between py-3 px-4 border-b">
        <CardTitle className="text-base font-semibold">COMMUNICATION (Last 7 days)</CardTitle>
        <Button variant="link" size="sm" className="text-primary hover:text-primary/80 px-0">
          See all
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </CardHeader>
      <CardContent className="p-4 space-y-4">
        {messagesData.map((message) => (
          <div key={message.id} className="flex items-start space-x-3">
            <Avatar className="h-10 w-10 flex-shrink-0">
              <AvatarImage src={message.sender.avatarUrl} alt={message.sender.name} />
              <AvatarFallback className="bg-muted-foreground/30 text-muted-foreground">
                {message.sender.initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-grow min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-foreground truncate">{message.sender.name}</p>
                <div className="flex items-center">
                  <p className="text-xs text-muted-foreground whitespace-nowrap">{message.timestamp}</p>
                  {message.isNew && <Dot className="h-6 w-6 text-destructive -ml-1 -mr-1" />}
                </div>
              </div>
              <p className="text-sm text-muted-foreground truncate mt-0.5">
                {message.messageSnippet}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default CommunicationFeed;
