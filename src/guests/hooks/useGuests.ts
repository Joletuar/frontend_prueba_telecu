import { useEffect, useState } from 'react';

import { GuestsResponseData } from '../interfaces/guests';
import { ENV_VARIABLES } from '../../lib/constants/variables';
import { getLocalStorage } from '../../auth/actions/auth';

import { type ErrorResponse } from '../../auth/interfaces/user';

export const useGuests = ({ page = 1, size = 5 }) => {
  const [data, setData] = useState<GuestsResponseData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    getGuests();
  }, [page, size]); // eschamos cambios en page y size

  // Función para obtener los datos de los visitantes
  const getGuests = async () => {
    const { token } = getLocalStorage();

    try {
      const res = await fetch(
        `${ENV_VARIABLES.baseURL}/guest?page=${page}&size=${size}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        const { error } = (await res.json()) as ErrorResponse;
        console.error(error);

        return setIsError(true);
      }

      const responseData = (await res.json()) as GuestsResponseData;

      setData(responseData);
    } catch (error) {
      console.error(error);

      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading, isError };
};
