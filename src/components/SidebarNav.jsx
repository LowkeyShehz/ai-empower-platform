
import { NavLink } from 'react-router-dom';
import { Home, Users, PenTool, Settings, Book, Plus, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const SidebarNav = ({ closeSidebar }) => {
  const onClickLink = () => {
    if (closeSidebar) {
      closeSidebar();
    }
  };

  const navItems = [
    { name: 'Home', icon: Home, path: '/' },
    { name: 'Agents', icon: Users, path: '/agents' },
    { name: 'Custom Agent', icon: Plus, path: '/custom-agent' },
    { name: 'Settings', icon: Settings, path: '/settings' },
    { name: 'About', icon: Book, path: '/about' },
  ];

  return (
    <aside className="w-64 h-full bg-sidebar text-sidebar-foreground border-r border-sidebar-border flex flex-col">
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
            <User size={18} />
          </div>
          <div className="font-semibold text-xl">AI Empower</div>
        </div>
      </div>
      
      <nav className="flex-1 overflow-y-auto p-2">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                onClick={onClickLink}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                    "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                      : "text-sidebar-foreground"
                  )
                }
              >
                <item.icon size={18} />
                <span>{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-sidebar-border">
        <div className="text-sm text-sidebar-foreground/70">
          © 2023 AI Empower Platform
        </div>
      </div>
    </aside>
  );
};

export default SidebarNav;
