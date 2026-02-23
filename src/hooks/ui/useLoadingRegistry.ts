import { useIsMutating, useIsFetching } from '@tanstack/react-query';

export const useLoadingRegistry = () => {
  const isMutating = useIsMutating({
    // Explicitly checks for true; undefined or false will be ignored
    predicate: (mutation) => mutation.meta?.showGlobalLoader === true,
  });

  const isFetching = useIsFetching({
    predicate: (query) => query.meta?.showGlobalLoader === true,
  });

  return isMutating > 0 || isFetching > 0;
};