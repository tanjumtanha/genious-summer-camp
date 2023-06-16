import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const useInstructor = () => {
  const { user, loading } = useContext(AuthContext);
  const [axiosSecure] = useAxiosSecure();

  const { data: instructorData, isLoading: isInstructorLoading } = useQuery(
    ['isInstructor', user?.email],
    async () => {
      const res = await axiosSecure.get(`/users/instructor/${user?.email}`);
      return res.data;
    },
    {
      enabled: !loading,
      refetchOnWindowFocus: false,
    }
  );

  const isInstructor = instructorData?.instructor || false;

  return [isInstructor, isInstructorLoading];
};

export default useInstructor;
