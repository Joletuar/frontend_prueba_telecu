import { useEffect, useState } from 'react';

import ENV_VARIABLES from '../../lib/constants/variables';
import { getLocalStorage } from '../../auth/actions/auth';

import { type ErrorResponse } from '../../auth/interfaces/user';
import { type Department } from '../interfaces/departmets';

export const useDepartments = () => {
  const [data, setData] = useState<Department[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    getGuests();
  }, []);

  const getGuests = async () => {
    const { token } = getLocalStorage();

    try {
      const res = await fetch(ENV_VARIABLES.baseURL + '/department', {
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

      setData(data.departments);
    } catch (error) {
      console.log(error);

      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading, isError };
};
