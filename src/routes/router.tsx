import { Navigate, createBrowserRouter } from 'react-router-dom';

import { LoginPage } from '../auth/pages/LoginPage';
import { RegisterPage } from '../auth/pages/RegisterPage';

import { MainLayout } from '../layouts/MainLayout';

import { GuestsPage } from '../guests/page/GuestsPage';
import { GuestUpdatePage } from '../guests/page/GuestUpdatePage';
import { HomeLayout } from '../guests/layouts/HomeLayout';
import { GuestNewPage } from '../guests/page/GuestNewPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      // Rutas para la sección de visitante
      {
        element: <HomeLayout />,
        children: [
          // Página principal de visitante
          {
            index: true,
            element: <GuestsPage />,
          },
          // Actualización de visitante
          {
            path: '/guest/:id',
            element: <GuestUpdatePage />,
          },
          // Crear un nuevo visitante
          {
            path: '/guest/new',
            element: <GuestNewPage />,
          },
        ],
      },
      // Rutas para la autenticación
      {
        path: '/auth/login/',
        element: <LoginPage />,
      },
      {
        path: '/auth/register/',
        element: <RegisterPage />,
      },
    ],
  },
  // Redireccionamos para el resto de rutas
  {
    path: '*',
    element: <Navigate to='/' />,
  },
]);
