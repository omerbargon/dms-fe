import { useSelector } from 'react-redux';
import { RootState } from './store';

export const useAuthUser = () => {
  const authUser = useSelector((state: RootState) => state.auth);
  return { ...authUser };
};
