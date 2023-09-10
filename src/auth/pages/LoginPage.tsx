import { Navigate } from 'react-router-dom';
import { getLocalStorage } from '../actions/auth';
import { LoginForm } from '../components/LoginForm';

export const LoginPage = () => {
  const session = getLocalStorage();

  if (session) {
    return <Navigate to='/' />;
  }

  return <LoginForm />;
};
