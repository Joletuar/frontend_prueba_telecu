import { useState, useEffect } from 'react';

import { Link, useNavigate, useParams } from 'react-router-dom';

import { useForm } from 'react-hook-form';
import { useGuest } from '../hooks/useGuest';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loading } from './shared/Loading';

import STATUS from '../../lib/constants/status';
import ENV_VARIABLES from '../../lib/constants/variables';
import { toast } from 'sonner';

import { ErrorMessage } from '../../lib/components/shared/ErrorMessage';

import {
  type GuestUpdateSchemaType,
  GuestUpdateSchemaValidator,
} from '../../lib/validations/guestValidation';
import { LetfArrowIcon } from './icons/Iconst';
import { type ErrorResponse } from '../../auth/interfaces/user';
import { getLocalStorage } from '../../auth/actions/auth';

interface FormData {
  note: string;
  status: string;
}

export const GuestUpdateForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<GuestUpdateSchemaType>({
    resolver: zodResolver(GuestUpdateSchemaValidator),
  });

  const [isFetching, setIsFetching] = useState(false);
  const navigate = useNavigate();
  const param = useParams();

  const { data: guest, isError, isLoading } = useGuest(param?.id!);

  useEffect(() => {
    setValue('note', guest?.note ?? '');
    setValue('status', guest?.status!);
  }, [guest]);

  const handleSubmitForm = async (data: FormData) => {
    const note = data.note.trim();
    const status = data.status.trim();

    setIsFetching(true);

    const { token } = getLocalStorage();

    fetch(ENV_VARIABLES.baseURL + `/guest/${param.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ note, status }),
    })
      .then(async (res) => {
        if (!res.ok) {
          const { error } = (await res.json()) as ErrorResponse;
          return toast.error(error);
        }

        toast.success('Actualización exitosa');

        navigate('/');
      })
      .catch(() => toast.error('Ha ocurrido un error, intente nuevamente'))
      .finally(() => setIsFetching(false));
  };

  if (isLoading && !isError) {
    return <Loading />;
  }

  if (!guest && !isError && Object.keys(guest!).length) {
    return null;
  }

  return (
    <section className='h-auto mt-10 mb-10'>
      <Link
        to='/'
        className='text-blue-600 ml-5 flex gap-x-1 hover:text-blue-900 transition-colors'
      >
        <LetfArrowIcon />
        Volver
      </Link>
      {guest && (
        <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0 h-full'>
          <div className='w-full bg-white rounded-lg shadow sm:max-w-2xl xl:p-0'>
            <div className='p-6 sm:p-8 flex flex-col gap-5 flex-1 justify-center'>
              <h2 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl'>
                Actualización de Visitantes
              </h2>
              <form
                className=' flex flex-col gap-5'
                onSubmit={handleSubmit(handleSubmitForm)}
              >
                {/* Fecha */}
                <div>
                  <label
                    htmlFor='date'
                    className='block mb-2 text-sm font-medium text-gray-900'
                  >
                    Fecha
                  </label>
                  <input
                    type='date'
                    id='date'
                    className='bg-gray-200 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 cursor-not-allowed'
                    value={guest?.date}
                    disabled
                  />
                </div>

                {/* Hora */}
                <div>
                  <label
                    htmlFor='time'
                    className='block mb-2 text-sm font-medium text-gray-900'
                  >
                    Hora
                  </label>
                  <input
                    type='time'
                    id='time'
                    className='bg-gray-200 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 cursor-not-allowed'
                    value={guest?.time}
                    disabled
                  />
                </div>

                {/* Nombre */}
                <div>
                  <label
                    htmlFor='name'
                    className='block mb-2 text-sm font-medium text-gray-900'
                  >
                    Nombre
                  </label>
                  <input
                    type='text'
                    id='name'
                    className='bg-gray-200 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 cursor-not-allowed'
                    value={guest?.name}
                    disabled
                  />
                </div>

                {/* Cédula */}
                <div>
                  <label
                    htmlFor='identificationCard'
                    className='block mb-2 text-sm font-medium text-gray-900'
                  >
                    Cédula
                  </label>
                  <input
                    type='text'
                    id='identificationCard'
                    className='bg-gray-200 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 cursor-not-allowed'
                    value={guest?.identificationCard}
                    disabled
                  />
                </div>

                {/* Fecha de Entrada */}
                <div>
                  <label
                    htmlFor='dateOfEntry'
                    className='block mb-2 text-sm font-medium text-gray-900'
                  >
                    Fecha de Entrada
                  </label>
                  <input
                    type='date'
                    id='dateOfEntry'
                    className='bg-gray-200 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 cursor-not-allowed'
                    value={guest?.dateOfEntry}
                    disabled
                  />
                </div>

                {/* Razón */}
                <div>
                  <label
                    htmlFor='reason'
                    className='block mb-2 text-sm font-medium text-gray-900'
                  >
                    Razón
                  </label>
                  <textarea
                    id='reason'
                    className='bg-gray-200 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 cursor-not-allowed'
                    value={guest?.reason}
                    disabled
                    rows={3}
                  />
                </div>

                {/* Departamento */}
                <div>
                  <label
                    htmlFor='department'
                    className='block mb-2 text-sm font-medium text-gray-900'
                  >
                    Departamento
                  </label>
                  <input
                    type='text'
                    id='department'
                    className='bg-gray-200 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 cursor-not-allowed'
                    value={guest?.department.type}
                    disabled
                  />
                </div>

                {/* Estado */}
                <div>
                  <label
                    htmlFor='status'
                    className='block mb-2 text-sm font-medium text-gray-900'
                  >
                    Estado
                  </label>
                  <select
                    {...register('status')}
                    id='status'
                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5'
                    defaultValue={guest?.status}
                  >
                    {STATUS.map(({ label, id }) => (
                      <option value={label} key={id}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Nota */}
                <div>
                  <label
                    htmlFor='note'
                    className='block mb-2 text-sm font-medium text-gray-900'
                  >
                    Nota
                  </label>
                  <textarea
                    {...register('note')}
                    id='note'
                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5'
                    rows={5}
                  />
                  {errors?.note && (
                    <ErrorMessage error={errors.note.message!} />
                  )}
                </div>

                <button
                  type='submit'
                  className='w-full  text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
                  disabled={isFetching}
                >
                  Actualizar
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {isError && (
        <div className='text-center w-full font-semibold text-md flex flex-col items-center h-full justify-center'>
          <span>Ha ocurrido un error, inténtalo nuevamente</span>
          <button
            onClick={() => window.location.reload()}
            className='mt-2 text-blue-800 cursor-pointer bg-blue-400 p-2 rounded-md hover:bg-blue-500 transition-colors'
          >
            Recargar la página
          </button>
        </div>
      )}
    </section>
  );
};
