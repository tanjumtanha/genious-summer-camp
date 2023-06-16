import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { useQuery } from '@tanstack/react-query';

const useCart = () => {
  const { user, loading } = useContext(AuthContext);
  const token = localStorage.getItem()

  const { refetch, data: cart = [] } = useQuery({
    queryKey: ['selectedClass', user?.email],
    enabled: !loading,
    queryFn: async () => {
      if (user) {
        const res = await fetch(`http://localhost:5000/selectedClass?email=${user.email}`
          , {
            headers: {
              authorization: `bearer ${token}`
            }
          });
        return res.json()
      }
    },
  });

  return [cart, refetch];
};

export default useCart;

