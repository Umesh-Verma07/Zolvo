import { Outlet } from 'react-router-dom';
import TopNav from './TopNav';
import BottomNav from './BottomNav';

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Fixed Top Navigation */}
      <TopNav />

      {/* Main Content Area */}
      {/* pb-20 lagaya hai taaki content Bottom Bar ke peeche na chupe */}
      <main className="max-w-5xl mx-auto px-4 py-6 pb-24 min-h-[calc(100vh-64px)]">
        <Outlet />
      </main>

      {/* Fixed Bottom Navigation (Mobile Only) */}
      <BottomNav />
    </div>
  );
};

export default AppLayout;