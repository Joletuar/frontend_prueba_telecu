import { useEffect, useState } from 'react';

import { type Guest } from '../interfaces/guests';
import { ENV_VARIABLES } from '../../lib/constants/variables';
import { getLocalStorage } from '../../auth/actions/auth';

import { type ErrorResponse } from '../../auth/interfaces/user';

export const useGuest = (id: String) => {
  const [data, setData] = useState<Guest | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    getGuests();
  }, []);

  const getGuests = async () => {
    const { token } = getLocalStorage();

    try {
      const res = await fetch(ENV_VARIABLES.baseURL + `/guest/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const { error } = (await res.json()) as ErrorResponse;
        console.log(error);

        return setIsError(true);
      }

      const data = await res.json();

      setData(data.guest);
    } catch (error) {
      console.log(error);

      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading, isError };
};
