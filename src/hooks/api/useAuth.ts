import {
  useMutation,
  useQueryClient,
  UseMutationResult,
} from '@tanstack/react-query';
import { authService } from '@src/services/domains/auth/auth.service';
import { AuthModel } from '@src/types';
import { LoginRequest } from '@src/services/domains/auth/auth.types';
import { useAuthStore } from '@src/store/useAuthStore';
import { reset } from '@src/utils/navigationRef';
import { Screen } from '@src/navigation/screen';

const AUTH_QUERY_KEY = ['auth'];

export const useLogin = (): UseMutationResult<
AuthModel, // what mutationFn RETURNS on success
Error, // standard JS Error
LoginRequest, // what you PASS INTO mutate()
unknown // advanced optimistic update usage (almost always unknown)
> => {
  const queryClient = useQueryClient();
  const setAuth = useAuthStore((state)=>state.setAuth);

  return useMutation({
    mutationFn: ({ email, password }: LoginRequest) =>
      authService.login({email,password}),

    // This flag is picked up by your useLoadingRegistry hook in the Root
    meta: {
      showGlobalLoader: true
    },
    onSuccess: (data) => {
      queryClient.setQueryData(AUTH_QUERY_KEY, data);
      setAuth(data)
      reset(Screen.BOTTOM_TAB)
    },
    onError: (error) => {
      console.error('Login error:', error);
    }
  });
};

export const useLogout = (): UseMutationResult<void, Error, void, unknown> => {
  const queryClient = useQueryClient();
  const clearAuth = useAuthStore((state)=>state.clearAuth)
  return useMutation({
    mutationFn: () => authService.logout(),
    meta: {
      showGlobalLoader: true
    },
    onSuccess: () => {
      clearAuth()
      queryClient.removeQueries({ queryKey: AUTH_QUERY_KEY });
    },
  });
};