import { LoaderIcon } from '../icons/Iconst';

export const Loading = () => {
  return (
    <div className='flex items-center justify-center min-h-screen min-w-screen gap-x-3'>
      <div role='status'>
        <span className='text-xl font-semibold'>Cargando...</span>
      </div>
      <span className='animate-spin'>
        <LoaderIcon />
      </span>
    </div>
  );
};
