import { QueryClient, QueryCache, MutationCache } from '@tanstack/react-query';
import { showMessage } from 'react-native-flash-message';

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error: any) => {
      showMessage({
        message: 'Network Error',
        description: error?.message || 'Something went wrong fetching data.',
        type: 'danger',
      });
    },
  }),
  mutationCache: new MutationCache({
    onError: (error: any) => {
      showMessage({
        message: 'Action Error',
        description: error?.message || 'The operation could not be completed.',
        type: 'danger',
      });
    },
  }),
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});