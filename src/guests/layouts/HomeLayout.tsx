import { Navigate, Outlet } from 'react-router-dom';
import { getLocalStorage } from '../../auth/actions/auth';
import { Navbar } from '../components/Navbar';

export const HomeLayout = () => {
  const session = getLocalStorage();

  if (!session) {
    return <Navigate to='/auth/login' />;
  }

  return (
    <div>
      <Navbar name={session?.user?.name} role={session?.user?.role} />
      <div className='w-full h-auto'>
        <Outlet />
      </div>
    </div>
  );
};
