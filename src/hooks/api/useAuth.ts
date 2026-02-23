import {
  useMutation,
  useQueryClient,
  UseMutationResult,
} from '@tanstack/react-query';
import { authService } from '@src/services/domains/auth/auth.service';
import { AuthModel } from '@src/types';
import { LoginRequest } from '@src/services/domains/auth/auth.types';

const AUTH_QUERY_KEY = ['auth'];

export const useLogin = (): UseMutationResult<AuthModel, Error, LoginRequest, unknown> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ email, password }: LoginRequest) =>
      authService.login({email,password}),
    // This flag is picked up by your useLoadingRegistry hook in the Root
    meta: {
      showGlobalLoader: true
    },
    onSuccess: (data) => {
      queryClient.setQueryData(AUTH_QUERY_KEY, data);
      // navigation.navigate('Home');
    },
  });
};

// export const useLogout = (): UseMutationResult<void, Error, void, unknown> => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: () => authService.logout(),
//     // Logouts usually benefit from a global loader to prevent user interaction during cleanup
//     meta: {
//       showGlobalLoader: true
//     },
//     onSuccess: () => {
//       // removeQueries is good, but clear() or resetQueries is often safer for logout
//       queryClient.removeQueries({ queryKey: AUTH_QUERY_KEY });
//     },
//   });
// };