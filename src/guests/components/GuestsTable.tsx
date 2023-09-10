import { useState } from 'react';
import { Link } from 'react-router-dom';

import { HEADERS_TABLE } from '../constants/headers';
import { useGuests } from '../hooks/useGuests';
import { Loading } from './shared/Loading';
import { AddIcon, EditIcon } from './icons/Iconst';
import { getLocalStorage } from '../../auth/actions/auth';
import { PaginationController } from './PaginationController';

const size = 5;
const initialPage = 1;

export const GuestsTable = () => {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const { data, isLoading, isError } = useGuests({
    page: currentPage,
    size,
  });

  if (isLoading && !isError) {
    return <Loading />;
  }

  const {
    user: { role },
  } = getLocalStorage();

  const showAccions = role !== 'SUPERVISOR';

  // Función para cambiar la página
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // calculamos el índice de inicio en la página actual
  const startIndex = (currentPage - 1) * size + 1;

  return (
    <div className='relative overflow-x-auto max-w-7xl mx-auto h-auto mt-10 mb-10 flex flex-col'>
      <div className='w-full h-full flex flex-col items-center justify-start gap-20'>
        <h1 className='text-4xl font-semibold w-full text-center'>
          Listado de Visitantes
        </h1>

        {/* Si es supervisor deshabilitamos */}
        {showAccions && (
          <Link
            to='/guest/new'
            className='focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-3 py-2.5 flex items-center gap-x-2 self-start'
          >
            <AddIcon />
            <p className='text-sm'>Agregar Visitante</p>
          </Link>
        )}

        <table className='w-full text-sm text-left text-gray-500'>
          <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
            <tr>
              {HEADERS_TABLE.map(({ label, id }) =>
                showAccions || label !== 'Acciones' ? (
                  <th scope='col' className='px-6 py-3' key={id}>
                    {label}
                  </th>
                ) : null
              )}
            </tr>
          </thead>

          <tbody>
            {data &&
              data?.guests.length > 0 &&
              data.guests.map(
                (
                  {
                    _id,
                    date,
                    dateOfEntry,
                    department,
                    identificationCard,
                    name,
                    reason,
                    status,
                    time,
                  },
                  index
                ) => (
                  <tr
                    className='bg-white border-b font-medium text-slate-600'
                    key={_id}
                  >
                    <td className='px-6 py-4'>{startIndex + index}</td>
                    <td className='px-6 py-4 w-[150px]'>{date}</td>
                    <td className='px-6 py-4'>{time}</td>
                    <td className='px-6 py-4 w-[150px]'>{name}</td>
                    <td className='px-6 py-4'>{identificationCard}</td>
                    <td className='px-6 py-4'>{dateOfEntry}</td>
                    <td className='px-6 py-4'>{reason}</td>
                    <td className='px-6 py-4'>{department.type}</td>
                    <td
                      className={`px-6 py-4 w-[100px] ${
                        status === 'EN CURSO'
                          ? 'text-emerald-600'
                          : 'text-red-600'
                      }`}
                    >
                      {status}
                    </td>

                    {/* Si es supervisor deshabilitamos */}
                    {showAccions && (
                      <td>
                        <div className='flex items-center justify-center gap-x-4'>
                          <Link
                            to={`/guest/${_id}`}
                            className='flex items-center gap-x-1 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-3 py-2.5 mr-2 mb-2'
                          >
                            <EditIcon />
                            Editar
                          </Link>
                        </div>
                      </td>
                    )}
                  </tr>
                )
              )}
          </tbody>
        </table>

        {/* Componente para paginar */}
        {data && data?.guests.length > 0 && (
          <PaginationController
            meta={data.meta}
            onPageChange={handlePageChange}
          />
        )}
      </div>

      {!data ||
        (data?.guests.length === 0 && (
          <span className='mt-20 text-center w-full'>
            No hay datos aún, ingrese datos
          </span>
        ))}

      {isError && (
        <div className='text-center w-full font-semibold text-md flex flex-col items-center mt-20'>
          <span>Ha ocurrido un error, inténtalo nuevamente</span>
          <button
            onClick={() => window.location.reload()}
            className='mt-2 text-blue-800 cursor-pointer bg-blue-400 p-2 rounded-md hover:bg-blue-500 transition-colors'
          >
            Recargar la página
          </button>
        </div>
      )}
    </div>
  );
};
