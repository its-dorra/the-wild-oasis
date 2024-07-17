import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logout as logoutApi } from '../../services/apiAuth';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const useLogout = function () {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: logout, isLoading: isLogingOut } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      toast.success('Log out successfully');
      navigate('/login', { replace: true });
      queryClient.removeQueries();
    },
    onError: () => {
      toast.error('Something went wrong , try again');
    },
  });

  return { logout, isLogingOut };
};
