import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useCart = () => {
  const { user, loading } = useContext(AuthContext);
  const token = localStorage.getItem('access-token');
  const [axiosSecure] = useAxiosSecure();

  const { refetch, data: cart = [] } = useQuery({
    queryKey: ['selectedClass', user?.email],
    enabled: !loading,
    queryFn: async () => {
      if (user) {
        const res = await axiosSecure(`/selectedClass?email=${user.email}`);
        console.log('res from axios',res)
        return res.data;
      }
    },
  });

  return [cart, refetch];
};

export default useCart;

