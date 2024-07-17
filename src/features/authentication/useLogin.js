import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login as loginApi } from '../../services/apiAuth';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const useLogin = function () {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isLoading: isLogin } = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      toast.success('Log in successfuly');
      navigate('/dashboard', { replace: true });
      queryClient.setQueryData(['user'], data.user);
    },
    onError: (err) => {
      console.error('error', err);
      toast.error('Provided email or password are incorrect');
    },
  });

  return { login, isLogin };
};
