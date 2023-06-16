import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { useQuery } from '@tanstack/react-query';

const useCart = () => {
    const { user, loading } = useContext(AuthContext);

    const { refetch, data: cart = [] } = useQuery({
        queryKey: ['selectedClass', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/selectedClass?email=${user?.email}`);
            const data = await res.json();
            console.log('data from fetch', data);
            return data;
        },
    });

    return [cart, refetch];
};

export default useCart;
