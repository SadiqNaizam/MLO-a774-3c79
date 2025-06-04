import React from 'react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Search, Bell, ChevronDown, UserCircle, Settings, LogOut } from 'lucide-react';

interface TopHeaderProps {
  userName?: string;
  userRole?: string;
  userAvatarSeed?: string; // For Vercel Avatars
}

const TopHeader: React.FC<TopHeaderProps> = ({
  userName = 'Peter Malby',
  userRole = 'DELL LAWYER',
  userAvatarSeed = 'peter_malby'
}) => {
  const initials = userName
    .split(' ')
    .map(name => name[0])
    .join('')
    .toUpperCase();
  
  const userAvatarUrl = `https://avatar.vercel.sh/${userAvatarSeed.toLowerCase().replace(/[^a-z0-9]/gi, '')}.png`;

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-background z-40 border-b border-border flex items-center justify-between px-6">
      {/* Search Bar - Occupies left part or middle if sidebar is not covered */} 
      <div className="flex-1 max-w-xs lg:max-w-md ml-0 sm:ml-60 md:ml-0"> {/* Adjust ml based on sidebar visibility if it's not fixed under */} 
      {/* Given sidebar is fixed and TopHeader is w-full, search should be aware of potential overlap in some layouts, but usually appears in the space right of sidebar */} 
      {/* Assuming search appears in main content area's header section, effectively pl-64 from edge of screen */} 
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="pl-10 h-10 w-full bg-background md:bg-muted/50 hover:bg-muted focus:bg-background rounded-lg border-border focus:border-primary"
          />
        </div>
      </div>

      {/* Right side icons & user profile */} 
      <div className="flex items-center space-x-3 md:space-x-4">
        <Button variant="ghost" size="icon" className="relative rounded-full text-muted-foreground hover:text-foreground hover:bg-muted">
          <Bell className="h-5 w-5" />
          {/* Notification dot example - can be controlled by state */}
          <span className="absolute top-1.5 right-2 block h-2.5 w-2.5 rounded-full bg-destructive ring-1 ring-background" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center space-x-2 p-1 pr-1.5 rounded-lg hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background">
              <div className="text-right hidden sm:block">
                <p className="text-xs text-muted-foreground leading-tight font-medium">{userRole}</p>
                <p className="text-sm font-semibold text-foreground leading-tight">{userName}</p>
              </div>
              <Avatar className="h-9 w-9">
                <AvatarImage src={userAvatarUrl} alt={userName} />
                <AvatarFallback className="bg-primary/80 text-primary-foreground font-semibold">{initials}</AvatarFallback>
              </Avatar>
              <ChevronDown className="h-4 w-4 text-muted-foreground hidden md:block" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 mt-1">
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{userName}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {userRole}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <UserCircle className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer text-destructive focus:bg-destructive/10 focus:text-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default TopHeader;
