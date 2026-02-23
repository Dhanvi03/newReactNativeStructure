// import {
//   useMutation,
//   useQuery,
//   useQueryClient,
//   UseQueryResult,
//   UseMutationResult,
// } from '@tanstack/react-query';
// import { userService } from '@src/services/domains/user/user.service';
// import { UserModel } from '@src/types/models/user.model';

// const USER_QUERY_KEY = ['user'];

// export const useUserProfile = (): UseQueryResult<UserModel, Error> => {
//   return useQuery({
//     queryKey: USER_QUERY_KEY,
//     queryFn: () => userService.getProfile(),
//     staleTime: 10 * 60 * 1000,
//   });
// };

// export const useUpdateProfile = (): UseMutationResult<UserModel, Error, any, unknown> => {
//   const queryClient = useQueryClient();

//   return useMutation((data) => userService.updateProfile(data), {
//     onSuccess: (data) => {
//       queryClient.setQueryData(USER_QUERY_KEY, data);
//     },
//   });
// };
