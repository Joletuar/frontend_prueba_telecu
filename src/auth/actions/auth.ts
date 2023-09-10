// almacenar el localstorage el usuario y token

import { AuthResponse } from '../interfaces/user';

export const setLocalStorage = (session: AuthResponse) => {
  try {
    localStorage.setItem('session', JSON.stringify(session));
  } catch (error) {
    console.error('Error al guardar la sesion en el localstorage');
  }
};

export const getLocalStorage = () => {
  try {
    const sessionData = localStorage.getItem('session');
    const session = sessionData ? JSON.parse(sessionData) : null;
    return session;
  } catch (error) {
    console.error('Error al obtener la sesionen el localstorage');
    return null;
  }
};
