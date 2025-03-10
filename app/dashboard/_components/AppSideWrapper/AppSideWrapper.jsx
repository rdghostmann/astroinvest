"use client";

import dynamic from 'next/dynamic';

// Dynamically import AppSidebar with SSR disabled
const AppSidebar = dynamic(() => import('@/components/app-sidebar'));

const AppSidebarWrapper = () => {
  return <AppSidebar />;
};

export default AppSidebarWrapper;