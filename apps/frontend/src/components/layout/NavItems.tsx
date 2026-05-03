import { IconFileDescription, IconLayoutDashboard, IconUser } from '@tabler/icons-react';
import { Link, useLocation } from 'react-router';
import { cn } from '../../lib/utils';

const navItems = [
  { label: 'Dashboard', path: '/', icon: IconLayoutDashboard },
  { label: 'Jobs', path: '/jobs', icon: IconFileDescription },
  { label: 'Employees', path: '/employees', icon: IconUser },
];

const NavItems = () => {
  const location = useLocation();

  return (
    <>
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              'block py-2 px-2 rounded-md text-sm',
              isActive ? 'text-blue-500 bg-blue-50' : ''
            )}
          >
            <div
              className={cn(
                'flex items-center gap-x-2 px-2 border-l-2',
                isActive ? 'border-blue-500' : 'border-transparent'
              )}
            >
              <item.icon stroke={2} size={20} />
              {item.label}
            </div>
          </Link>
        );
      })}
    </>
  );
};

export default NavItems;
