import React, { useEffect } from "react";
import { useGetUserQuery } from "../../api/apiSlice";
import { setUser, clearUser } from "../../features/authSlice";
import { Loader } from "./Loader";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

interface AuthWrapperProps {
  children: React.ReactNode;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { data: user, isError } = useGetUserQuery();
  const isLoading = useAppSelector((state) => state.auth.isLoading);

  // TODO LATER : Optimize to reduce backend calls

  useEffect(() => {
    if (user) {
      dispatch(setUser(user.data));
    } else if (isError) {
      dispatch(clearUser());
    }
  }, [user, isError, dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  return <>{children}</>;
};

export default AuthWrapper;
