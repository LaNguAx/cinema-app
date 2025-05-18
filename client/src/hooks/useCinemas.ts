// hooks/useCinemas.ts
import { useQuery } from '@tanstack/react-query';
import { getCinemas } from '../services/cinemas';
import { useDispatch } from 'react-redux';
import { setCinema } from '../store/slices/cinemaSlice';
import { useEffect } from 'react';

export function useCinemas() {
  const dispatch = useDispatch();

  const { isPending, error, isSuccess, isError, data } = useQuery({
    queryKey: ['cinemas'],
    queryFn: getCinemas,
    staleTime: 1000 * 60 * 5,
  });

  useEffect(() => {
    if (isSuccess && data && data.length > 0) {
      const firstCinema = data[0];
      dispatch(
        setCinema({
          id: firstCinema._id,
          name: firstCinema.name,
          movies: firstCinema.movies.map((movie) => ({
            id: movie._id,
            title: movie.title,
          })),
        })
      );
    }

    if (isError) {
      console.error('❌ Failed to fetch cinemas:', error);
    }
  }, [isSuccess, isError, data, error, dispatch]);

  return { isPending, error };
}
