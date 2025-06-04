import React from 'react';
import AdminLayout from '../components/layout/AdminLayout';
import PerformanceSummary from '../components/Dashboard/PerformanceSummary';
import CaseListTable from '../components/Dashboard/CaseListTable';
import CommunicationFeed from '../components/Dashboard/CommunicationFeed';
import CaseBreakdownChart from '../components/Dashboard/CaseBreakdownChart';
import CalendarWidget from '../components/Dashboard/CalendarWidget';

const IndexPage: React.FC = () => {
  return (
    <AdminLayout>
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_auto] gap-6">
        {/* Left Column: Main content area, takes 2 fractions of space on large screens */}
        <div className="flex flex-col space-y-6">
          <PerformanceSummary />
          <CaseListTable />
          <CommunicationFeed />
          <CaseBreakdownChart />
        </div>

        {/* Right Column: Sidebar-like content, takes automatic width based on content on large screens */}
        {/* 
          Sticky behavior for the right column on large screens. 
          'lg:top-6' is used because the parent scrolling container in AdminLayout has 'p-6'.
          This makes the top of the sticky element align with the top padding of its container,
          effectively positioning it 1.5rem below the fixed TopHeader after scrolling begins.
          'self-start' ensures the column aligns to the top of its grid area.
        */}
        <div className="lg:sticky lg:top-6 self-start">
          <CalendarWidget />
        </div>
      </div>
    </AdminLayout>
  );
};

export default IndexPage;
