import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateUser as updateUserApi } from '../../services/apiAuth';
import toast from 'react-hot-toast';

export const useUpdateUser = function () {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isLoading: isUpdatingUser } = useMutation({
    mutationFn: updateUserApi,
    onSuccess: () => {
      toast.success('User information updated Successfully');
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: () => {
      toast.error('Something went wrong, try again');
    },
  });

  return { updateUser, isUpdatingUser };
};
