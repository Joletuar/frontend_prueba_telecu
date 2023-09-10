import { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import STATUS from '../../lib/constants/status';
import ENV_VARIABLES from '../../lib/constants/variables';
import { ErrorMessage } from '../../lib/components/shared/ErrorMessage';

import { toast } from 'sonner';

import {
  type GuestSchemaType,
  GuestSchemaValidator,
} from '../../lib/validations/guestValidation';

import { LetfArrowIcon } from './icons/Iconst';
import { type ErrorResponse } from '../../auth/interfaces/user';

import { getLocalStorage } from '../../auth/actions/auth';
import { useDepartments } from '../hooks/useDepartments';

interface FormData {
  date: string;
  name: string;
  time: string;
  identificationCard: string;
  dateOfEntry: string;
  reason: string;
  department: string;
  status: string;
  note: string;
}

export const NewGuestForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<GuestSchemaType>({
    resolver: zodResolver(GuestSchemaValidator),
  });

  const { data: departments } = useDepartments();

  const [isFetching, setIsFetching] = useState(false);
  const navigate = useNavigate();

  const handleSubmitForm = async (data: FormData) => {
    const name = data.name.trim();
    const time = data.time.trim();
    const identificationCard = data.identificationCard.trim();
    const dateOfEntry = data.dateOfEntry.trim();
    const reason = data.reason.trim();
    const department = data.department.trim();
    const status = data.status.trim();
    const note = data.note.trim();
    const date = data.date.trim();

    setIsFetching(true);

    const { token } = getLocalStorage();

    fetch(ENV_VARIABLES.baseURL + '/guest', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        time,
        date,
        dateOfEntry,
        identificationCard,
        reason,
        department,
        status,
        note,
      }),
    })
      .then(async (res) => {
        if (!res.ok) {
          const { error } = (await res.json()) as ErrorResponse;
          return toast.error(error);
        }

        toast.success('Registro de invitado exitoso');

        navigate('/');
      })
      .catch(() => toast.error('Ha ocurrido un error, intente nuevamente'))
      .finally(() => setIsFetching(false));
  };

  return (
    <section className='h-auto mt-10 mb-10'>
      <Link
        to='/'
        className='text-blue-600 ml-5 flex gap-x-1 hover:text-blue-900 transition-colors'
      >
        <LetfArrowIcon />
        Volver
      </Link>

      <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0 h-full'>
        <div className='w-full bg-white rounded-lg shadow sm:max-w-2xl xl:p-0'>
          <div className='p-6 sm:p-8 flex flex-col gap-5 flex-1 justify-center'>
            <h2 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl'>
              Registro de Visitantes
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
                  {...register('date')}
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5'
                />
                {errors?.date && <ErrorMessage error={errors.date.message!} />}
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
                  {...register('time')}
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5'
                />
                {errors?.time && <ErrorMessage error={errors.time.message!} />}
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
                  {...register('name')}
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5'
                />
                {errors?.name && <ErrorMessage error={errors.name.message!} />}
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
                  {...register('identificationCard')}
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5'
                />
                {errors?.identificationCard && (
                  <ErrorMessage error={errors.identificationCard.message!} />
                )}
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
                  {...register('dateOfEntry')}
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5'
                />
                {errors?.dateOfEntry && (
                  <ErrorMessage error={errors.dateOfEntry.message!} />
                )}
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
                  {...register('reason')}
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5'
                  rows={3}
                />
                {errors?.reason && (
                  <ErrorMessage error={errors.reason.message!} />
                )}
              </div>

              {/* Departamento */}
              <div>
                <label
                  htmlFor='department'
                  className='block mb-2 text-sm font-medium text-gray-900'
                >
                  Departamento
                </label>
                <select
                  {...register('department')}
                  id='department'
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5'
                  defaultValue={
                    departments && departments.length > 0
                      ? departments[0]._id
                      : ''
                  }
                >
                  {departments?.map(({ type, _id }) => (
                    <option value={_id} key={_id}>
                      {type}
                    </option>
                  ))}
                </select>
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
                  defaultValue='EN CURSO'
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
              </div>

              <button
                type='submit'
                className='w-full  text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
                disabled={isFetching}
              >
                Registrar
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
