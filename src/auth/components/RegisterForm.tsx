import { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod/src/zod.js';

import { ENV_VARIABLES } from '../../lib/constants/variables';
import ROLS from '../../lib/constants/rols';

import { toast } from 'sonner';

import { ErrorMessage } from '../../lib/components/shared/ErrorMessage';
import {
  RegisterSchemaType,
  RegisterSchemaValidator,
} from '../../lib/validations/userValidation';
import type { AuthResponse, ErrorResponse } from '../interfaces/user';
import { setLocalStorage } from '../actions/auth';

interface FormData {
  name: string;
  email: string;
  password: string;
  role: 'RECEPCION' | 'SUPERVISOR';
}

const defaultValues: FormData = {
  name: '',
  email: '',
  password: '',
  role: 'RECEPCION',
};

export const RegisterForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<RegisterSchemaType>({
    resolver: zodResolver(RegisterSchemaValidator),
    defaultValues,
  });

  const [isFetching, setIsFetching] = useState(false);
  const navigate = useNavigate();

  const handleSubmitForm = async (data: FormData) => {
    const email = data.email.trim();
    const password = data.password.trim();
    const name = data.name.trim();
    const role = data.role.trim();

    setIsFetching(true);

    fetch(ENV_VARIABLES.baseURL + '/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, name, role }),
    })
      .then(async (res) => {
        if (!res.ok) {
          const { error } = (await res.json()) as ErrorResponse;
          return toast.error(error);
        }

        const data = (await res.json()) as AuthResponse;

        toast.success('Registro exitoso');

        setLocalStorage(data);

        navigate('/');
      })
      .catch(() => toast.error('Ha ocurrido un error, intente nuevamente'))
      .finally(() => setIsFetching(false));
  };

  return (
    <section className='bg-gray-50 h-screen'>
      <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0 h-full'>
        <div className='w-full bg-white rounded-lg shadow sm:max-w-md xl:p-0'>
          <div className='p-6 sm:p-8 flex flex-col gap-5 flex-1 justify-center'>
            <h2 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl '>
              Registro de usuario
            </h2>
            <form
              className=' flex flex-col gap-5'
              onSubmit={handleSubmit(handleSubmitForm)}
            >
              {/* Nombre */}
              <div>
                <label
                  htmlFor='name'
                  className='block mb-2 text-sm font-medium text-gray-900 '
                >
                  Nombre
                </label>
                <input
                  {...register('name')}
                  type='text'
                  id='name'
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5'
                  placeholder='Johan Tuarez'
                />

                {errors?.name && <ErrorMessage error={errors.name.message!} />}
              </div>

              {/* Correo */}
              <div>
                <label
                  htmlFor='email'
                  className='block mb-2 text-sm font-medium text-gray-900 '
                >
                  Correo
                </label>
                <input
                  {...register('email')}
                  type='text'
                  id='email'
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5'
                  placeholder='example@example.com'
                />

                {errors?.email && (
                  <ErrorMessage error={errors.email.message!} />
                )}
              </div>

              {/* Contraseña */}
              <div>
                <label
                  htmlFor='password'
                  className='block mb-2 text-sm font-medium text-gray-900'
                >
                  Contraseña
                </label>
                <input
                  {...register('password')}
                  type='password'
                  id='password'
                  placeholder='••••••••'
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-slate-600 focus:border-slate-600 block w-full p-2.5 '
                />

                {errors?.password && (
                  <ErrorMessage error={errors.password.message!} />
                )}
              </div>

              {/* Rol */}
              <div>
                <label
                  htmlFor='role'
                  className='block mb-2 text-sm font-medium text-gray-900'
                >
                  Rol
                </label>
                <select
                  {...register('role')}
                  id='role'
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                  defaultValue='RECEPCION'
                >
                  {ROLS.map((rol) => (
                    <option value={rol.type} key={rol.id}>
                      {rol.type}
                    </option>
                  ))}
                </select>

                {errors?.role && <ErrorMessage error={errors.role.message!} />}
              </div>

              <button
                type='submit'
                className='w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center '
                disabled={isFetching}
              >
                Registrarse
              </button>

              <p className='text-sm font-light text-gray-500 dark:text-gray-400 self-end'>
                Ya tienes cuenta?{' '}
                <Link
                  to='/auth/login'
                  className='font-medium text-slate-600 hover:underline dark:text-slate-500'
                >
                  Ingresar con una cuenta
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
