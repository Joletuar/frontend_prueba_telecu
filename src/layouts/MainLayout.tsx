import { Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';

export const MainLayout = () => {
  return (
    <div>
      <Toaster richColors />
      <Outlet />
    </div>
  );
};
