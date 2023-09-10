import { useNavigate } from 'react-router-dom';

import { LogoutIcon } from './icons/Iconst';

import { toast } from 'sonner';

export const Navbar = ({ name, role }: { name: string; role: string }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    try {
      localStorage.removeItem('session');
      toast.success('Sesión cerrada correctamente');

      navigate('/auth/login');
    } catch (error) {
      console.log(error);
      toast.error('Error al cerrar sesión');
    }
  };

  return (
    <nav className='bg-gray-800 p-4'>
      <div className='container mx-auto'>
        <div className='flex justify-between items-center'>
          <div className='text-white font-semibold text-lg uppercase'>
            {name} - {role}
          </div>
          <button
            className='bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-2 rounded flex gap-x-2'
            onClick={handleLogout}
          >
            <LogoutIcon />
            Salir
          </button>
        </div>
      </div>
    </nav>
  );
};
