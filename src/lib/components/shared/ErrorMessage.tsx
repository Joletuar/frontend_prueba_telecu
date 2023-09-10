export const ErrorMessage = ({ error }: { error: string }) => {
  return (
    <span className='text-red-500 text-xs mt-1 font-normal block w-full'>
      {error}
    </span>
  );
};
