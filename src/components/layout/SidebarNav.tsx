import React from 'react';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  LayoutGrid,
  Activity,
  BarChart2,
  FileCheck,
  FileText,
  Library,
  Heart,
  ChevronDown,
  ChevronUp,
  Shapes
} from 'lucide-react';

interface NavSubItem {
  id: string;
  label: string;
  href: string;
  isActive?: boolean;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  href?: string;
  isActive?: boolean;
  badge?: string | number;
  subItems?: NavSubItem[];
  isAccordion?: boolean;
}

interface RecentMessage {
  id: string;
  name: string;
  avatarUrl?: string;
  initials: string;
}

const mainNavItemsData: NavItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: LayoutGrid,
    isAccordion: true,
    subItems: [
      { id: 'activity', label: 'Activity', href: '#activity' },
      { id: 'statistic', label: 'Statistic', href: '#statistic' },
      { id: 'performance-cases', label: 'Performance Cases', href: '#performance-cases', isActive: true },
    ],
  },
  { id: 'tasks', label: 'Tasks', icon: FileText, href: '#tasks', badge: 5 },
  { id: 'libraries', label: 'Libraries', icon: Library, href: '#libraries' },
  { id: 'saved', label: 'Saved', icon: Heart, href: '#saved' },
];

const recentMessagesData: RecentMessage[] = [
  { id: 'msg1', name: 'Erik Gunsel', initials: 'EG', avatarUrl: 'https://avatar.vercel.sh/erik.png' },
  { id: 'msg2', name: 'Arthur Adelk', initials: 'AA', avatarUrl: 'https://avatar.vercel.sh/arthur.png' },
  { id: 'msg3', name: 'Emily Smith', initials: 'ES', avatarUrl: 'https://avatar.vercel.sh/emily.png' },
];

const SidebarNav: React.FC = () => {
  const [isRecentMessagesOpen, setIsRecentMessagesOpen] = React.useState(true);
  const [activeAccordionItem, setActiveAccordionItem] = React.useState<string | undefined>(
    mainNavItemsData.find(item => item.isAccordion && item.subItems?.some(sub => sub.isActive))?.id
  );

  return (
    <aside className="fixed top-0 left-0 h-full w-64 bg-sidebar text-sidebar-foreground border-r border-sidebar-border z-30 flex flex-col">
      <ScrollArea className="flex-1">
        <div className="pt-20 pb-4 px-4 space-y-6"> {/* pt-16 for header + pt-4 for self padding top */}
          {/* Logo Section */}
          <div className="flex items-center space-x-3 px-2 mb-6">
            <Shapes className="h-8 w-8 text-sidebar-primary" />
            <h1 className="text-xl font-bold text-sidebar-foreground">Dashboard</h1>
          </div>

          {/* Main Navigation Section */}
          <div>
            <span className="px-2 text-xs font-semibold uppercase text-sidebar-foreground/70 tracking-wider">Main</span>
            <nav className="mt-2 space-y-1">
              {mainNavItemsData.map((item) => (
                item.isAccordion && item.subItems ? (
                  <Accordion key={item.id} type="single" collapsible className="w-full" value={activeAccordionItem} onValueChange={setActiveAccordionItem}>
                    <AccordionItem value={item.id} className="border-none">
                      <AccordionTrigger
                        className={cn(
                          "flex items-center justify-between w-full p-2.5 rounded-md text-sm font-medium hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring focus-visible:ring-offset-2 focus-visible:ring-offset-sidebar",
                          item.subItems.some(sub => sub.isActive) && !activeAccordionItem?.includes(item.id) ? "bg-sidebar-accent/50 text-sidebar-accent-foreground" : "text-sidebar-foreground",
                          activeAccordionItem === item.id && "bg-sidebar-accent text-sidebar-accent-foreground"
                        )}
                      >
                        <div className="flex items-center space-x-3">
                          <item.icon className="h-5 w-5 flex-shrink-0" />
                          <span>{item.label}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="pt-1 pb-0 pl-5 mt-1 space-y-1">
                        {item.subItems.map((subItem) => (
                          <a
                            key={subItem.id}
                            href={subItem.href}
                            className={cn(
                              "flex items-center space-x-3 py-2 px-3 rounded-md text-sm font-medium hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                              subItem.isActive ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm" : "text-sidebar-foreground/80"
                            )}
                          >
                            {/* Placeholder for potential bullet or indent visual */} 
                            {/* <span className="w-1 h-1 bg-sidebar-foreground/50 rounded-full"></span> */} 
                            <span>{subItem.label}</span>
                          </a>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ) : (
                  <a
                    key={item.id}
                    href={item.href}
                    className={cn(
                      "flex items-center justify-between p-2.5 rounded-md text-sm font-medium hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                      item.isActive ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm" : "text-sidebar-foreground"
                    )}
                  >
                    <div className="flex items-center space-x-3">
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <Badge className="bg-destructive text-destructive-foreground text-xs h-5 px-1.5">
                        {item.badge}
                      </Badge>
                    )}
                  </a>
                )
              ))}
            </nav>
          </div>

          {/* Recent Messages Section */}
          <div>
            <Button
              variant="ghost"
              className="flex items-center justify-between w-full px-2 py-2 text-xs font-semibold uppercase text-sidebar-foreground/70 tracking-wider hover:bg-transparent hover:text-sidebar-foreground/80"
              onClick={() => setIsRecentMessagesOpen(!isRecentMessagesOpen)}
            >
              Recent Messages
              {isRecentMessagesOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
            {isRecentMessagesOpen && (
              <div className="mt-2 space-y-1.5">
                {recentMessagesData.map((message) => (
                  <div key={message.id} className="flex items-center space-x-2.5 p-1.5 rounded-md hover:bg-sidebar-accent group cursor-pointer">
                    <Avatar className="h-7 w-7">
                      <AvatarImage src={message.avatarUrl} alt={message.name} />
                      <AvatarFallback className="text-xs bg-sidebar-accent text-sidebar-accent-foreground group-hover:bg-sidebar-primary/20 group-hover:text-sidebar-primary">
                        {message.initials}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-sidebar-foreground/80 group-hover:text-sidebar-accent-foreground truncate">{message.name}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </ScrollArea>
    </aside>
  );
};

export default SidebarNav;
