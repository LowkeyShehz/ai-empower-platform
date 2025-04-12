
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import SidebarNav from '@/components/SidebarNav';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/ModeToggle';

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Mobile sidebar trigger */}
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={toggleSidebar}
          className="bg-background/80 backdrop-blur-sm"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>

      {/* Sidebar */}
      <div className={`z-40 md:z-auto fixed md:sticky top-0 h-screen transition-all duration-300 ease-in-out md:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <SidebarNav closeSidebar={() => setSidebarOpen(false)} />
      </div>

      {/* Main content */}
      <div className="flex-1 p-4 md:p-8 w-full overflow-auto">
        <div className="flex justify-end mb-6">
          <ModeToggle />
        </div>
        <main className="container mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
