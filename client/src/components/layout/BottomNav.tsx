import { Home, Search, Calendar, User } from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';
import clsx from 'clsx';

const BottomNav = () => {
  const location = useLocation();

  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Search, label: 'Search', path: '/search' },
    { icon: Calendar, label: 'Bookings', path: '/bookings' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 pb-safe md:hidden z-50">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.label}
              to={item.path}
              className="flex flex-col items-center justify-center w-full h-full space-y-1"
            >
              <item.icon
                size={22}
                className={clsx(
                  isActive ? 'text-primary' : 'text-gray-400',
                  'transition-colors duration-200'
                )}
                strokeWidth={isActive ? 2.5 : 2}
              />
              <span
                className={clsx(
                  'text-[10px] font-medium',
                  isActive ? 'text-primary' : 'text-gray-400'
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;