import { Navigate } from 'react-router-dom';
import { getLocalStorage } from '../actions/auth';
import { RegisterForm } from '../components/RegisterForm';

export const RegisterPage = () => {
  const session = getLocalStorage();

  if (session) {
    return <Navigate to='/' />;
  }

  return <RegisterForm />;
};
