import { Navigate } from 'react-router-dom';
import { getLocalStorage } from '../../auth/actions/auth';
import { GuestsTable } from '../components/GuestsTable';

export const GuestsPage = () => {
  const session = getLocalStorage();

  if (!session) {
    return <Navigate to='/auth/login' />;
  }
  return <GuestsTable />;
};
