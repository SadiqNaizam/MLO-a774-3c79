import React from 'react';
import SidebarNav from './SidebarNav';
import TopHeader from './TopHeader';
// No cn needed here as styles are direct

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* TopHeader is fixed, full-width, and overlays the top portion of the SidebarNav */}
      <TopHeader />
      
      {/* SidebarNav is fixed to the left. Its own internal padding handles the TopHeader height. */}
      <SidebarNav />
      
      {/* Main content area, offset for fixed SidebarNav and TopHeader */}
      {/* The 'ml-64' corresponds to SidebarNav's width (w-64) */}
      {/* The 'pt-16' corresponds to TopHeader's height (h-16) */}
      <main className="ml-64 pt-16">
        {/* Inner div for padding as per mainContent.container: "p-6" */}
        {/* min-h-[calc(100vh-4rem)] ensures content area can fill viewport height below header */}
        <div className="p-6 min-h-[calc(100vh-theme(spacing.16))] ">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
